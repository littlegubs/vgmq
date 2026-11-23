import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Collection } from '../../games/entity/collection.entity'
import { GameToMusic } from '../../games/entity/game-to-music.entity'
import { Genre } from '../../games/entity/genre.entity'
import { Theme } from '../../games/entity/theme.entity'
import { User } from '../../users/user.entity'
import { LobbyCreateDto } from '../dto/lobby-create.dto'
import { LobbyCollectionFilter } from '../entities/lobby-collection-filter.entity'
import { LobbyGenreFilter } from '../entities/lobby-genre-filter.entity'
import { LobbyThemeFilter } from '../entities/lobby-theme-filter.entity'
import { LobbyUser, LobbyUserRole } from '../entities/lobby-user.entity'
import { Lobby, LobbyDifficulties } from '../entities/lobby.entity'
import { LobbyGateway } from '../lobby.gateway'
import { LobbyUserService } from './lobby-user.service'

@Injectable()
export class LobbyService {
    constructor(
        @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
        @InjectRepository(LobbyUser) private lobbyUserRepository: Repository<LobbyUser>,
        @InjectRepository(GameToMusic) private gameToMusicRepository: Repository<GameToMusic>,
        @InjectRepository(Collection) private collectionRepository: Repository<Collection>,
        @InjectRepository(Genre) private genreRepository: Repository<Genre>,
        @InjectRepository(Theme) private themeRepository: Repository<Theme>,
        @InjectRepository(LobbyCollectionFilter)
        private collectionFilterRepository: Repository<LobbyCollectionFilter>,
        @InjectRepository(LobbyGenreFilter)
        private genreFilterRepository: Repository<LobbyGenreFilter>,
        @InjectRepository(LobbyThemeFilter)
        private themeFilterRepository: Repository<LobbyThemeFilter>,
        @Inject(forwardRef(() => LobbyGateway)) private lobbyGateway: LobbyGateway,
        private lobbyUserService: LobbyUserService,
    ) {}
    async findByName(query: string): Promise<Lobby[]> {
        const qb = this.lobbyRepository
            .createQueryBuilder('lobby')
            .leftJoinAndSelect('lobby.lobbyMusics', 'lobbyMusic')
            .leftJoinAndSelect('lobby.lobbyUsers', 'lobbyUser')
            .where('lobby.name LIKE :name')
            .setParameter('name', `%${query}%`)
        return qb.getMany()
    }

    async create(data: LobbyCreateDto, user: User): Promise<Lobby> {
        const lobby = await this.lobbyRepository.save({
            code: await this.generateCode(),
            ...data,
            premium: user.premium,
            difficulty: this.handleDifficulties(data.difficulty),
            collectionFilters: await this.handleCollectionFilter(data.collectionFilters),
            genreFilters: await this.handleGenreFilter(data.genreFilters),
            themeFilters: await this.handleThemeFilter(data.themeFilters),
        })

        // upon lobby connection, check if user is already in another lobby
        const lobbyUser = await this.lobbyUserRepository.findOne({
            relations: { user: { patreonAccount: true }, lobby: true },
            where: {
                user: {
                    id: user.id,
                },
            },
        })
        if (lobbyUser) {
            await this.lobbyUserRepository.remove(lobbyUser)
            await this.lobbyUserService.handlePlayerDisconnected(lobbyUser)
        }
        await this.lobbyUserRepository.save({
            lobby,
            user,
            role: LobbyUserRole.Host,
            lastAnswerAt: new Date(),
        })

        return lobby
    }

    async update(lobby: Lobby, data: LobbyCreateDto): Promise<void> {
        await this.lobbyRepository.save({
            ...lobby,
            ...data,
            difficulty: this.handleDifficulties(data.difficulty),
            collectionFilters: await this.handleCollectionFilter(data.collectionFilters),
            genreFilters: await this.handleGenreFilter(data.genreFilters),
            themeFilters: await this.handleThemeFilter(data.themeFilters),
        })

        await this.lobbyGateway.sendUpdateToRoom(lobby.code)
    }

    private handleDifficulties(data: LobbyCreateDto['difficulty']): LobbyDifficulties[] {
        if (data.length === 0) {
            return [LobbyDifficulties.Easy, LobbyDifficulties.Medium, LobbyDifficulties.Hard]
        }
        return data
    }

    private async handleCollectionFilter(
        data: LobbyCreateDto['collectionFilters'],
    ): Promise<Awaited<LobbyCollectionFilter>[]> {
        return Promise.all(
            data.map(async (collectionFilter) => {
                const collection = await this.collectionRepository.findOneBy({
                    id: collectionFilter.id,
                })
                if (collection === null) {
                    throw new Error('Collection not found')
                }
                return this.collectionFilterRepository.create({
                    collection,
                    type: collectionFilter.type,
                    limitation: collectionFilter.limitation,
                })
            }),
        )
    }

    private async handleGenreFilter(
        data: LobbyCreateDto['genreFilters'],
    ): Promise<Awaited<LobbyGenreFilter>[]> {
        return Promise.all(
            data.map(async (genreFilter) => {
                const genre = await this.genreRepository.findOneBy({
                    id: genreFilter.id,
                })
                if (genre === null) {
                    throw new Error('Genre not found')
                }
                return this.genreFilterRepository.create({
                    genre,
                    type: genreFilter.type,
                    limitation: genreFilter.limitation,
                })
            }),
        )
    }

    private async handleThemeFilter(
        data: LobbyCreateDto['themeFilters'],
    ): Promise<Awaited<LobbyThemeFilter>[]> {
        return Promise.all(
            data.map(async (genreFilter) => {
                const theme = await this.themeRepository.findOneBy({
                    id: genreFilter.id,
                })
                if (theme === null) {
                    throw new Error('Theme not found')
                }
                return this.themeFilterRepository.create({
                    theme,
                    type: genreFilter.type,
                    limitation: genreFilter.limitation,
                })
            }),
        )
    }

    async generateCode(): Promise<string> {
        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        let code = ''
        do {
            for (let i = 0; i < 4; i++) {
                code += str[Math.floor(Math.random() * str.length)]
            }
        } while (null !== (await this.lobbyRepository.findOneBy({ code })))

        if (code === '') {
            throw new InternalServerErrorException()
        }
        return code
    }

    async getMusicAccuracyRatio(lobby?: Lobby): Promise<number> {
        const minDuration = lobby ? lobby.guessTime : 5

        const counts: { totalCount: string; countWithAccuracy: string } | undefined =
            await this.gameToMusicRepository
                .createQueryBuilder('gameToMusic')
                .leftJoin('gameToMusic.music', 'music')
                .where('music.duration >= :duration', { duration: minDuration })
                .select('COUNT(gameToMusic.id)', 'totalCount')
                .addSelect(
                    'COUNT(CASE WHEN gameToMusic.guessAccuracy IS NOT NULL THEN 1 END)',
                    'countWithAccuracy',
                )
                .getRawOne()

        const countGameToMusic = parseInt(counts!.totalCount, 10) || 0
        const countGameToMusicWithAccuracy = parseInt(counts!.countWithAccuracy, 10) || 0

        let gameToMusicAccuracyRatio = countGameToMusicWithAccuracy / countGameToMusic
        // force at least a 10% chance of contributing missing data
        if (gameToMusicAccuracyRatio > 0.9) gameToMusicAccuracyRatio = 0.9

        return gameToMusicAccuracyRatio
    }

    getRandomFloat(min: number, max: number, decimals: number): number {
        const str = (Math.random() * (max - min) + min).toFixed(decimals)

        return parseFloat(str)
    }
}
