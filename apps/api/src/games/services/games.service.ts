import * as path from 'path'

import {
    DeleteByQueryResponse,
    IndexResponse,
    UpdateByQueryResponse,
} from '@elastic/elasticsearch/lib/api/types'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { InjectRepository } from '@nestjs/typeorm'
import { extension } from 'mime-types'
import { Brackets, Repository } from 'typeorm'

import { DiscordService } from '../../discord/discord.service'
import { File } from '../../entity/file.entity'
import { User } from '../../users/user.entity'
import { GameSearchSortBy } from '../dto/games-search.dto'
import { AlternativeName } from '../entity/alternative-name.entity'
import { Collection } from '../entity/collection.entity'
import { ColorPalette } from '../entity/color-palette.entity'
import { Cover } from '../entity/cover.entity'
import { GameAlbum } from '../entity/game-album.entity'
import { GameToMusic } from '../entity/game-to-music.entity'
import { Game } from '../entity/game.entity'
import { Music } from '../entity/music.entity'
import GameNameSearchBody from '../types/game-name-search-body.interface'
import { Vibrant } from 'node-vibrant/node'
import { StorageService } from '../../storage/storage.interface'
import { PRIVATE_STORAGE, PUBLIC_STORAGE } from '../../storage/storage.constants'
import { ConfigService } from '@nestjs/config'
import { spawn } from 'child_process'

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game) private gameRepository: Repository<Game>,
        @InjectRepository(Cover) private coverRepository: Repository<Cover>,
        @InjectRepository(ColorPalette) private colorPaletteRepository: Repository<ColorPalette>,
        @InjectRepository(Music) private musicRepository: Repository<Music>,
        @InjectRepository(GameToMusic) private gameToMusicRepository: Repository<GameToMusic>,
        @InjectRepository(File) private fileRepository: Repository<File>,
        @InjectRepository(AlternativeName)
        private alternativeNameRepository: Repository<AlternativeName>,
        @InjectRepository(GameAlbum) private gameAlbumRepository: Repository<GameAlbum>,
        @InjectRepository(Collection) private collectionRepository: Repository<Collection>,
        private elasticsearchService: ElasticsearchService,
        @Inject(PRIVATE_STORAGE) private privateStorageService: StorageService,
        @Inject(PUBLIC_STORAGE) private publicStorageService: StorageService,
        private discordService: DiscordService,
        private configService: ConfigService,
    ) {}
    async findByName(
        query: string,
        options?: {
            showDisabled?: boolean
            onlyShowWithoutMusics?: boolean
            filterByUser?: User
            sortBy: GameSearchSortBy
            limit?: number
            skip?: number
            nsfw?: boolean
        },
    ): Promise<[Game[], number]> {
        const qb = this.gameRepository
            .createQueryBuilder('game')
            .addSelect((sbq) => {
                return sbq
                    .select('COUNT(*)', 'count')
                    .from('user_games', 'ug')
                    .where('ug.gameId = game.id')
            }, 'countUsers')
            .leftJoin('game.alternativeNames', 'alternativeName')
            .loadRelationCountAndMap('game.countMusics', 'game.musics', 'countMusics', (qb) => {
                return qb.andWhere('countMusics.deleted = 0')
            })
            .loadRelationCountAndMap('game.countUsers', 'game.users', 'countUsers')
            .leftJoinAndSelect('game.cover', 'cover')
            .leftJoinAndSelect('cover.colorPalette', 'colorPalette')
            .loadRelationIdAndMap('game.platformIds', 'game.platforms')
            .where(
                new Brackets((qb) => {
                    qb.orWhere('game.name LIKE :name').orWhere(
                        new Brackets((qb) => {
                            qb.andWhere('alternativeName.name LIKE :name').andWhere(
                                'alternativeName.enabled = 1',
                            )
                        }),
                    )
                }),
            )
            .setParameter('name', `%${query}%`)
            .groupBy('game.id')
        if (options?.showDisabled === false) {
            qb.andWhere('game.enabled = 1')
        }

        if (
            options?.onlyShowWithoutMusics !== undefined &&
            options?.onlyShowWithoutMusics !== false
        ) {
            qb.leftJoin('game.musics', 'music').andWhere('music.id IS NULL')
        }

        if (options?.filterByUser instanceof User) {
            qb.leftJoin('game.users', 'user').andWhere('user.id = :userId', {
                userId: options.filterByUser.id,
            })
        }

        if (!options?.nsfw) {
            qb.andWhere('game.nsfw != 1')
        }

        if (options?.sortBy === GameSearchSortBy.NameDesc) {
            qb.addOrderBy('game.name', 'DESC')
        } else {
            switch (options?.sortBy) {
                case GameSearchSortBy.CountUsersAsc:
                    qb.addOrderBy('countUsers', 'ASC')
                    break
                case GameSearchSortBy.CountUsersDesc:
                    qb.addOrderBy('countUsers', 'DESC')
                    break
                case GameSearchSortBy.CountMusicsAsc:
                    qb.addOrderBy('countMusics', 'ASC')
                    break
                case GameSearchSortBy.CountMusicsDesc:
                    qb.addOrderBy('countMusics', 'DESC')
                    break
            }
            qb.addOrderBy('game.name')
        }

        if (options?.limit !== undefined) {
            qb.limit(options?.limit)
        }

        if (options?.skip !== undefined) {
            qb.offset(options?.skip)
        }
        return qb.getManyAndCount()
    }

    async getGamesIdsForUser(user: User): Promise<number[]> {
        const qb = this.gameRepository
            .createQueryBuilder('game')
            .select('game.id')
            .leftJoin('game.users', 'user')
            .andWhere('user.id = :userId', { userId: user.id })
        const rawValues = await qb.getRawMany<{ game_id: number }>()
        return rawValues.map((game) => game.game_id)
    }

    async toggle(slug: string): Promise<Game> {
        const game = await this.gameRepository.findOne({
            relations: {
                alternativeNames: true,
                musics: {
                    derivedGameToMusics: {
                        game: true,
                    },
                    originalGameToMusic: {
                        game: true,
                    },
                },
            },
            where: {
                slug,
            },
        })
        if (game === null) {
            throw new NotFoundException()
        }
        return this.gameRepository.save({ ...game, enabled: !game.enabled })
    }

    async uploadMusics(game: Game, files: Array<Express.Multer.File>, user: User): Promise<void> {
        let musics: GameToMusic[] = []
        // eslint-disable-next-line import/no-unresolved
        const mm = await import('music-metadata')
        for (const file of files) {
            const metadata = await mm.parseBuffer(file.buffer, file.mimetype, {
                duration: true,
                skipPostHeaders: true,
            })

            const exactDuration = await this.getExactMusicDuration(file.buffer).catch((err) => {
                console.warn('ffprobe failed, falling back to metadata guess', err)
                return metadata.format.duration
            })
            const filePath = `${game.slug}/${Math.random().toString(36).slice(2, 9)}${path.extname(
                file.originalname,
            )}`
            await this.privateStorageService.putObject(filePath, file.buffer)
            const album = await this.generateAlbum(metadata, game, user)
            const title = metadata.common.title ?? file.originalname
            const artist = metadata.common.artist ?? 'unknown artist'
            const disk = metadata.common.disk?.no
            const track = metadata.common.track?.no
            musics = [
                ...musics,
                await this.gameToMusicRepository.save({
                    game,
                    title,
                    artist,
                    disk,
                    track,
                    music: this.musicRepository.create({
                        title,
                        artist,
                        duration: exactDuration,
                        disk,
                        track,
                        file: this.fileRepository.create({
                            path: filePath,
                            originalFilename: file.originalname,
                            mimeType: file.mimetype,
                            size: file.size,
                        }),
                    }),
                    ...(album && { album: album }),
                    addedBy: user,
                }),
            ]
        }
        try {
            let content = 'New musics added:\n'
            for (const music of musics) {
                content += `${music.music.title} - ${music.music.artist}\n`
            }
            void this.discordService.sendUpdateForGame({ game, content, user, type: 'success' })
        } catch (e) {
            console.error(e)
        }
    }

    private async getExactMusicDuration(buffer: Buffer): Promise<number> {
        return new Promise((resolve, reject) => {
            const ffmpegPath = this.configService.get<string>('FFMPEG_PATH') ?? 'ffmpeg'
            const ffmpegArgs = this.configService.get<string>('FFMPEG_ARGS') ?? ''

            // The magic command:
            // -i pipe:0 : Read from stdin
            // -vn       : Ignore all video/image streams (drops the cover art)
            // -f null - : Throw the output away
            const commandArgs = `${ffmpegArgs} -i pipe:0 -vn -f null -`

            const ffmpegProcess = spawn(ffmpegPath, commandArgs.split(' ').filter(Boolean), {
                env: process.env,
                shell: true,
            })

            let stderrOutput = ''

            // Note: ffmpeg logs its progress to stderr, NOT stdout!
            ffmpegProcess.stderr.on('data', (data: Buffer) => {
                stderrOutput += data.toString()
            })

            // Keep stdout drained just in case
            ffmpegProcess.stdout.on('data', () => {})

            ffmpegProcess.on('close', () => {
                const timeMatches = stderrOutput.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d+)/g)
                const lastTime = timeMatches ? timeMatches[timeMatches.length - 1] : undefined

                if (lastTime) {
                    const timeString = lastTime.replace('time=', '') // "00:00:28.47"

                    const parts = timeString.split(':')
                    const hours = parseInt(parts[0] ?? '0', 10)
                    const minutes = parseInt(parts[1] ?? '0', 10)
                    const seconds = parseFloat(parts[2] ?? '0')

                    const totalSeconds = hours * 3600 + minutes * 60 + seconds
                    resolve(totalSeconds)
                } else {
                    reject(
                        new Error(
                            'Could not find Duration in ffmpeg output. Output: ' + stderrOutput,
                        ),
                    )
                }
            })

            // Pipe the file buffer
            ffmpegProcess.stdin.write(buffer)
            ffmpegProcess.stdin.end()
        })
    }

    /**
     * TODO I'm forced to use type "any" for the metadata since i'm importing "music-metadata" asynchronously, fix this
     */
    private async generateAlbum(metadata: any, game: Game, user?: User): Promise<null | GameAlbum> {
        const metadataAlbum = metadata.common.album
        let album: GameAlbum | null = null
        if (metadataAlbum !== undefined && metadataAlbum !== '') {
            album = await this.gameAlbumRepository.findOne({
                relations: ['game'],
                where: { name: metadataAlbum, game: { id: game.id } },
            })
            if (album === null) {
                album = await this.gameAlbumRepository.save(
                    this.gameAlbumRepository.create({
                        game,
                        name: metadataAlbum,
                        date: String(metadata.common.year),
                        createdBy: user,
                        updatedBy: user,
                    }),
                )
                const metadataCover = metadata.common.picture?.[0]
                if (metadataCover !== undefined) {
                    const coverExtension = extension(metadataCover.format)
                    if (coverExtension !== false) {
                        const coverPath = `games/${game.slug}/${Math.random()
                            .toString(36)
                            .slice(2, 9)}.${coverExtension}`
                        await this.publicStorageService.putObject(coverPath, metadataCover.data)
                        album = this.gameAlbumRepository.create({
                            ...album,
                            cover: this.fileRepository.create({
                                path: coverPath,
                                originalFilename: metadataAlbum,
                                mimeType: metadataCover.format,
                                size: metadataCover.data.byteLength,
                                private: false,
                            }),
                        })
                    }
                }
                album = await this.gameAlbumRepository.save(album)
            }
        }
        return album
    }

    async populateElasticSearch(): Promise<void> {
        await this.elasticsearchService.indices
            .delete({
                index: 'game_name',
            })
            .catch(() => {})
        await this.elasticsearchService.indices.create({
            index: 'game_name',
            settings: {
                max_ngram_diff: 30,
                analysis: {
                    normalizer: {
                        lobby_autocomplete_normalizer: {
                            type: 'custom',
                            filter: ['lowercase', 'custom_icu_folding'],
                        },
                        lobby_autocomplete_normalizer_slug: {
                            type: 'custom',
                            char_filter: ['my_char_filter'],
                            filter: ['lowercase', 'custom_icu_folding'],
                        },
                    },
                    analyzer: {
                        lobby_autocomplete_analyzer: {
                            type: 'custom',
                            tokenizer: 'lobby_autocomplete_tokenizer',
                            char_filter: ['my_char_filter'],
                            filter: ['lowercase', 'custom_icu_folding'],
                        },
                    },
                    filter: {
                        custom_icu_folding: {
                            type: 'icu_folding',
                            unicode_set_filter: '[^²]',
                        },
                    },
                    char_filter: {
                        my_char_filter: {
                            type: 'pattern_replace',
                            pattern: '([:.,-](\\s*)?)',
                            replacement: ' ',
                        },
                    },
                    tokenizer: {
                        lobby_autocomplete_tokenizer: {
                            type: 'ngram',
                            min_gram: 1,
                            max_gram: 30,
                            token_chars: [],
                        },
                    },
                },
            },
            mappings: {
                properties: {
                    name: {
                        type: 'keyword',
                        normalizer: 'lobby_autocomplete_normalizer',
                        copy_to: ['name_slug', 'suggest_highlight'],
                    },
                    name_slug: {
                        type: 'keyword',
                        normalizer: 'lobby_autocomplete_normalizer_slug',
                    },
                    suggest_highlight: {
                        type: 'text',
                        analyzer: 'lobby_autocomplete_analyzer',
                        term_vector: 'with_positions_offsets',
                        store: true,
                    },
                },
            },
        })
        const games = await this.gameRepository
            .createQueryBuilder('g')
            .select(['g.id', 'g.name'])
            .where('g.enabled = 1')
            .getMany()
        for (const game of games) {
            await this.indexGameName(game)
        }
        const alternativeNames = await this.alternativeNameRepository
            .createQueryBuilder('an')
            .select(['an.id', 'an.name'])
            .where('an.enabled = 1')
            .getMany()
        for (const alternativeName of alternativeNames) {
            await this.indexAlternativeName(alternativeName)
        }
        const collections = await this.collectionRepository
            .createQueryBuilder('c')
            .select(['c.id', 'c.name'])
            .getMany()
        for (const collection of collections) {
            await this.indexCollectionName(collection)
        }
    }

    indexGameName(game: Game): Promise<IndexResponse> {
        return this.elasticsearchService.index<GameNameSearchBody>({
            index: 'game_name',
            document: {
                id: game.id,
                name: game.name,
                type: 'game_name',
            },
        })
    }

    removeGameName(game: Game): Promise<DeleteByQueryResponse> {
        return this.elasticsearchService.deleteByQuery({
            index: 'game_name',
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                id: game.id,
                            },
                        },
                        {
                            match: {
                                type: 'game_name',
                            },
                        },
                    ],
                },
            },
        })
    }

    updateGameName(game: Game): Promise<UpdateByQueryResponse> {
        return this.elasticsearchService.updateByQuery({
            index: 'game_name',
            script: {
                source: `ctx._source["name"] = "${game.name}"`,
            },
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                id: game.id,
                            },
                        },
                        {
                            match: {
                                type: 'game_name',
                            },
                        },
                    ],
                },
            },
        })
    }

    indexAlternativeName(alternativeName: AlternativeName): Promise<IndexResponse> {
        return this.elasticsearchService.index<GameNameSearchBody>({
            index: 'game_name',
            document: {
                id: alternativeName.id,
                name: alternativeName.name,
                type: 'alternative_name',
            },
        })
    }

    removeAlternativeName(alternativeName: AlternativeName): Promise<DeleteByQueryResponse> {
        return this.elasticsearchService.deleteByQuery({
            index: 'game_name',
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                id: alternativeName.id,
                            },
                        },
                        {
                            match: {
                                type: 'alternative_name',
                            },
                        },
                    ],
                },
            },
        })
    }

    updateAlternativeName(alternativeName: AlternativeName): Promise<UpdateByQueryResponse> {
        return this.elasticsearchService.updateByQuery({
            index: 'game_name',
            script: {
                source: `ctx._source["name"] = "${alternativeName.name}"`,
            },
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                id: alternativeName.id,
                            },
                        },
                        {
                            match: {
                                type: 'alternative_name',
                            },
                        },
                    ],
                },
            },
        })
    }

    indexCollectionName(collection: Collection): Promise<IndexResponse> {
        return this.elasticsearchService.index<GameNameSearchBody>({
            index: 'game_name',
            body: {
                id: collection.id,
                name: collection.name,
                type: 'collection_name',
            },
        })
    }

    removeCollectionName(collection: Collection): Promise<DeleteByQueryResponse> {
        return this.elasticsearchService.deleteByQuery({
            index: 'game_name',
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                id: collection.id,
                            },
                        },
                        {
                            match: {
                                type: 'collection_name',
                            },
                        },
                    ],
                },
            },
        })
    }

    async getGameWithMusics(slug: string): Promise<Game> {
        const game = await this.gameRepository
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.cover', 'cover')
            .leftJoinAndSelect('cover.colorPalette', 'colorPalette')
            .leftJoinAndSelect('game.alternativeNames', 'alternativeNames')
            .leftJoinAndSelect('game.albums', 'albums')
            .leftJoinAndSelect('albums.cover', 'albumCover')
            .leftJoinAndSelect('albums.musics', 'musics', 'musics.deleted = false')
            .leftJoinAndSelect('musics.music', 'music')
            .leftJoinAndSelect('musics.derivedGameToMusics', 'derivedGameToMusics')
            .leftJoinAndSelect('derivedGameToMusics.game', 'derivedGame')
            .leftJoinAndSelect('musics.originalGameToMusic', 'originalGameToMusic')
            .leftJoinAndSelect('originalGameToMusic.game', 'originalGame')
            .leftJoinAndSelect('game.platforms', 'platforms')
            .leftJoinAndSelect('game.collections', 'collections')
            .leftJoinAndSelect('game.themes', 'themes')
            .leftJoinAndSelect('game.genres', 'genres')
            .where('game.slug = :slug', { slug })
            .orderBy('albums.date', 'DESC')
            .addOrderBy('musics.disk', 'ASC')
            .addOrderBy('musics.track', 'ASC')
            .addOrderBy('music.disk', 'ASC')
            .addOrderBy('music.track', 'ASC')
            .getOne()
        if (game === null) {
            throw new NotFoundException()
        }
        game.musics = await this.gameToMusicRepository
            .createQueryBuilder('gmt')
            .leftJoinAndSelect('gmt.derivedGameToMusics', 'dgtm')
            .leftJoinAndSelect('dgtm.game', 'dgtmg')
            .leftJoinAndSelect('gmt.originalGameToMusic', 'ogtm')
            .leftJoinAndSelect('ogtm.game', 'ogtmg')
            .leftJoinAndSelect('gmt.music', 'music')
            .andWhere('gmt.gameId = :id', { id: game.id })
            .andWhere('gmt.album IS NULL')
            .andWhere('gmt.deleted = 0')
            .orderBy({
                'gmt.disk': 'ASC',
                'gmt.track': 'ASC',
                'music.disk': 'ASC',
                'music.track': 'ASC',
            })
            .getMany()

        return game
    }

    async updateGameCoverColorPalette(): Promise<void> {
        const covers = await this.coverRepository.find()
        for (const cover of covers) {
            const colorPalette = await Vibrant.from(
                `https://images.igdb.com/igdb/image/upload/t_1080p/${cover.imageId}.jpg`,
            ).getPalette()
            await this.coverRepository.save({
                ...cover,
                colorPalette: this.colorPaletteRepository.create({
                    vibrantHex: colorPalette.Vibrant?.hex,
                    mutedHex: colorPalette.Muted?.hex,
                    darkMutedHex: colorPalette.DarkMuted?.hex,
                    darkVibrantHex: colorPalette.DarkVibrant?.hex,
                    lightMutedHex: colorPalette.LightMuted?.hex,
                    lightVibrantHex: colorPalette.LightVibrant?.hex,
                    backgroundColorHex: colorPalette.DarkVibrant?.hex,
                    colorHex: colorPalette.Vibrant?.hex,
                }),
            })
        }
    }

    async generateAlbums(): Promise<void> {
        const games = await this.gameRepository
            .createQueryBuilder('g')
            .innerJoinAndSelect('g.musics', 'gm')
            .innerJoinAndSelect('gm.music', 'm')
            .innerJoinAndSelect('m.file', 'f')
            .andWhere('gm.album IS NULL')
            .orderBy('g.name')
            .getMany()
        for (const game of games) {
            await this.generateAlbumFromExistingFiles(game)
        }
    }

    public async generateAlbumFromExistingFiles(game: Game, user?: User): Promise<void> {
        // eslint-disable-next-line import/no-unresolved
        const mm = await import('music-metadata')
        for (const gameToMusic of game.musics) {
            const buffer = await this.privateStorageService.getObject(gameToMusic.music.file.path)
            const metadata = await mm.parseBuffer(buffer, gameToMusic.music.file.mimeType, {
                duration: true,
            })
            const album = await this.generateAlbum(metadata, game, user)
            await this.gameToMusicRepository.save({
                ...gameToMusic,
                music: {
                    ...gameToMusic.music,
                    disk: metadata.common.disk?.no,
                    track: metadata.common.track?.no,
                },
                ...(album && { album: album }),
                ...(user && { updatedBy: user }),
            })
        }
    }
}
