import { InjectQueue } from '@nestjs/bull'
import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { Duration } from 'luxon'
import { Brackets, DataSource, In, Repository, SelectQueryBuilder } from 'typeorm'

import { Collection } from '../../games/entity/collection.entity'
import { GameToMusic, GameToMusicType } from '../../games/entity/game-to-music.entity'
import { Game } from '../../games/entity/game.entity'
import { Genre } from '../../games/entity/genre.entity'
import { Screenshot } from '../../games/entity/screenshot.entity'
import { Theme } from '../../games/entity/theme.entity'
import { Video } from '../../games/entity/video.entity'
import { shuffle } from '../../utils/utils'
import { LobbyCollectionFilter } from '../entities/lobby-collection-filter.entity'
import { LobbyGenreFilter } from '../entities/lobby-genre-filter.entity'
import { LobbyMusic } from '../entities/lobby-music.entity'
import { LobbyThemeFilter } from '../entities/lobby-theme-filter.entity'
import { LobbyUser, LobbyUserRole } from '../entities/lobby-user.entity'
import { Lobby, LobbyDifficulties, LobbyStatuses } from '../entities/lobby.entity'
import { LobbyGateway } from '../lobby.gateway'
import { LobbyService } from './lobby.service'

@Injectable()
export class LobbyMusicLoaderService {
    contributeMissingData: boolean
    lobby: Lobby

    constructor(
        @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
        @InjectRepository(Game) private gameRepository: Repository<Game>,
        @InjectRepository(LobbyMusic) private lobbyMusicRepository: Repository<LobbyMusic>,
        @InjectRepository(LobbyUser) private lobbyUserRepository: Repository<LobbyUser>,
        @InjectRepository(GameToMusic) private gameToMusicRepository: Repository<GameToMusic>,
        @InjectRepository(Video) private videoRepository: Repository<Video>,
        @InjectRepository(Screenshot) private screenshotRepository: Repository<Screenshot>,
        @Inject(forwardRef(() => LobbyGateway)) private lobbyGateway: LobbyGateway,
        @InjectQueue('lobby') private lobbyQueue: Queue,
        @Inject(forwardRef(() => LobbyService)) private lobbyService: LobbyService,
        private datasource: DataSource,
    ) {}

    /**
     * Used for infinite lobbies
     */
    async loadMusic(lobby: Lobby): Promise<LobbyMusic> {
        this.lobby = lobby

        this.contributeMissingData = this.lobby.allowContributeToMissingData
            ? Math.random() > (await this.lobbyService.getMusicAccuracyRatio(this.lobby))
            : false
        //TODO refactor into more functions to prevent too much duplicates
        const gameQueryBuilder = this.gameRepository
            .createQueryBuilder('game')
            .select('game.id')
            .innerJoin('game.musics', 'gameToMusic')
            .innerJoin('gameToMusic.music', 'music')
            .andWhere('game.enabled = 1')
            .andWhere('gameToMusic.deleted = 0')
            .andWhere('music.duration >= :guessTime')
            .setParameter('guessTime', this.lobby.guessTime)
            .groupBy('game.id')
            .orderBy('RAND()')

        // Fetch from the top 250 games for public lobbies EASY and MEDIUM
        if (['EASY', 'MEDIUM'].includes(lobby.code)) {
            const top250Games: { count: number; gameId: number }[] = await this.datasource
                .createQueryBuilder()
                .select('COUNT(*)', 'count')
                .addSelect('gameId')
                .from('user_games', 'ug')
                .groupBy('ug.gameId')
                .orderBy('count', 'DESC')
                .limit(250)
                .getRawMany()

            gameQueryBuilder.andWhere('game.id IN (:top250Games)', {
                top250Games: top250Games.map((game) => game.gameId),
            })
        }

        const game = await this.getGameOrMusic(gameQueryBuilder)
        if (game === null) {
            return this.loadMusic(lobby)
        }
        const qb = this.gameToMusicRepository
            .createQueryBuilder('gameToMusic')
            .leftJoinAndSelect('gameToMusic.music', 'music')
            .leftJoinAndSelect('gameToMusic.game', 'game')
            .andWhere('gameToMusic.game = :game')
            .andWhere('gameToMusic.deleted = 0')
            .andWhere('music.duration >= :guessTime')
            .setParameter('game', game.id)
            .setParameter('guessTime', lobby.guessTime)
            .orderBy('RAND()')

        const last100PickedMusics = await this.lobbyMusicRepository
            .createQueryBuilder('lobbyMusic')
            .select('lobbyMusic.gameToMusic')
            .andWhere('lobbyMusic.lobby = :lobby', { lobby: lobby.id })
            .orderBy('lobbyMusic.id', 'DESC')
            .limit(100)
            .getRawMany()

        if (last100PickedMusics.length > 0) {
            qb.andWhere('gameToMusic.id NOT IN (:last100PickedMusics)', {
                last100PickedMusics: last100PickedMusics.map(
                    (lobbyMusic) => lobbyMusic.gameToMusicId,
                ),
            })
        }
        const gameToMusicId = await this.getGameOrMusic(qb)
        const gameToMusic =
            gameToMusicId === null
                ? null
                : await this.gameToMusicRepository.findOne({
                      relations: {
                          music: { file: true },
                          game: true,
                          derivedGameToMusics: { game: true },
                          originalGameToMusic: {
                              game: true,
                              derivedGameToMusics: { game: true },
                          },
                      },
                      where: { id: gameToMusicId?.id },
                  })
        if (gameToMusic === null) {
            return this.loadMusic(lobby)
        }

        const music = gameToMusic.music
        const lobbyMusicDuration = lobby.playMusicOnAnswerReveal
            ? lobby.guessTime + 10
            : lobby.guessTime
        const endAt =
            lobbyMusicDuration > music.duration
                ? music.duration
                : this.getRandomFloat(lobbyMusicDuration, music.duration, 4)
        const startAt = lobbyMusicDuration > music.duration ? 0 : endAt - lobbyMusicDuration
        const expectedAnswers = this.getExpectedAnswers(gameToMusic)
        const hintModeGames = await this.getHintModeGames(gameToMusic)
        const video = await this.getVideo(gameToMusic)
        let startVideoAt = 0
        if (video) {
            startVideoAt = Math.floor(
                Math.random() * (Duration.fromISO(video.duration).as('seconds') - 10 + 1),
            )
        }
        const countLobbyMusics = await this.lobbyMusicRepository.count({
            relations: { lobby: true },
            where: {
                lobby: {
                    id: lobby.id,
                },
            },
        })
        let lobbyMusic = this.lobbyMusicRepository.create({
            lobby,
            gameToMusic,
            position: countLobbyMusics + 1,
            startAt,
            endAt,
            expectedAnswers,
            hintModeGames,
            contributeToMissingData: [
                LobbyDifficulties.Easy,
                LobbyDifficulties.Medium,
                LobbyDifficulties.Hard,
            ].every((value) => {
                return lobby.difficulty.includes(value)
            })
                ? false
                : this.contributeMissingData,
            video,
            startVideoAt,
            screenshots: await this.getScreenshots(gameToMusic),
        })
        await this.gameToMusicRepository.save({
            ...gameToMusic,
        })

        lobbyMusic = await this.lobbyMusicRepository.save(
            this.lobbyMusicRepository.create(lobbyMusic),
        )
        return lobbyMusic
    }

    async loadMusics(lobby: Lobby): Promise<void> {
        this.lobby = lobby
        const players = await this.lobbyUserRepository.find({
            relations: {
                user: true,
            },
            where: {
                lobby: {
                    id: this.lobby.id,
                },
                role: In([LobbyUserRole.Player, LobbyUserRole.Host]),
            },
        })

        if (players === undefined || players.length === 0) {
            this.lobby = this.lobbyRepository.create({
                ...this.lobby,
                status: LobbyStatuses.Waiting,
            })
            await this.lobbyRepository.save(this.lobby)
            await this.lobbyGateway.sendUpdateToRoom(this.lobby.code)
            throw new InternalServerErrorException()
        }
        /**
         * If user manages to set lobby.playedMusics > lobby.musicNumber, set it back to musicNumber value
         * TODO don't be lazy and actually throw an error here src/lobbies/dto/lobby-create.dto.ts:34
         */
        const playedMusics =
            this.lobby.playedMusics > this.lobby.musicNumber
                ? this.lobby.musicNumber
                : this.lobby.playedMusics

        let userIds: number[] = []
        let userIdsRandom: Array<number[] | undefined | 'unplayed' | 'random'> = []
        players.forEach((player) => {
            userIds = [...userIds, player.user.id]
            userIdsRandom = [
                ...userIdsRandom,
                ...Array<number[]>(Math.floor(playedMusics / players.length)).fill([
                    player.user.id,
                ]),
            ]
        })
        // if the lobby allows random games, fill the rest of userIdsRandom with 'random'
        // todo The following commented line will be helpful once someone devs an "unplayed" slider
        // let playedGames: Game[] = [] // exclude theses played games from search if the game must be unplayed
        if (playedMusics < this.lobby.musicNumber) {
            userIdsRandom = [
                ...userIdsRandom,
                ...Array(this.lobby.musicNumber - playedMusics).fill('random'),
            ]
            // playedGames = await this.gameRepository
            //     .createQueryBuilder('game')
            //     .select('game.id')
            //     .innerJoin('game.users', 'user')
            //     .andWhere('game.enabled = 1')
            //     .andWhere('user.id IN (:userIds)', { userIds: userIds })
            //     .getMany()
        }
        if (userIdsRandom.length < this.lobby.musicNumber) {
            userIdsRandom = [
                ...userIdsRandom,
                ...Array(this.lobby.musicNumber - userIdsRandom.length).fill([
                    userIds[Math.floor(Math.random() * userIds.length)],
                ]),
            ]
        }
        userIdsRandom = shuffle(userIdsRandom)

        let alreadyFetchedGameIds: number[] = []
        let alreadyFetchedCollectionIds: number[] = []
        let alreadyFetchedGenreIds: number[] = []
        let alreadyFetchedThemeIds: number[] = []
        let excludedGameIds: number[] = []
        let excludedCollectionIds: number[] = []
        let excludedGenreIds: number[] = []
        let excludedThemeIds: number[] = []
        let lobbyMusics: LobbyMusic[] = []
        let position = 0

        const gameToMusicAccuracyRatio = await this.lobbyService.getMusicAccuracyRatio(this.lobby)
        let loadedMusic = 0
        while (userIdsRandom.some((userId) => userId !== undefined)) {
            for (const userId of userIdsRandom) {
                if (userId === undefined) {
                    continue
                }
                this.contributeMissingData = this.lobby.allowContributeToMissingData
                    ? Math.random() > gameToMusicAccuracyRatio
                    : false
                const i = userIdsRandom.indexOf(userId)
                const gameQueryBuilder = this.gameRepository
                    .createQueryBuilder('game')
                    .select('game.id')
                    .innerJoin('game.musics', 'gameToMusic')
                    .innerJoin('gameToMusic.music', 'music')
                    .andWhere('game.enabled = 1')
                    .andWhere('gameToMusic.deleted = 0')
                    .andWhere('music.duration >= :guessTime')
                    .setParameter('guessTime', this.lobby.guessTime)
                    .groupBy('game.id')
                    .orderBy('RAND()')

                if (userId === 'unplayed') {
                    // todo uncomment this once we implement "unplayed" slider
                    // gameQueryBuilder.andWhere(`game.id not in (:gamesPlayedIds)`, {
                    //     gamesPlayedIds: playedGames.map((g) => g.id),
                    // })
                } else if (userId !== 'random') {
                    gameQueryBuilder
                        .innerJoin('game.users', 'user')
                        .andWhere('user.id in (:userIds)', { userIds: userId })
                }

                if (!this.lobby.allowDuplicates && alreadyFetchedGameIds.length > 0) {
                    gameQueryBuilder.andWhere('game.id not in (:ids)', {
                        ids: alreadyFetchedGameIds,
                    })
                }
                if (excludedGameIds.length > 0) {
                    gameQueryBuilder.andWhere('game.id not in (:excludedGameIds)', {
                        excludedGameIds: excludedGameIds,
                    })
                }

                if (lobby.premium) {
                    gameQueryBuilder
                        .leftJoin('game.collections', 'collection')
                        .leftJoin('game.genres', 'genre')
                        .leftJoin('game.themes', 'theme')

                    if (lobby.filterByYear) {
                        gameQueryBuilder.andWhere(
                            'YEAR(game.firstReleaseDate) BETWEEN :minYear AND :maxYear',
                            { minYear: lobby.filterMinYear, maxYear: lobby.filterMaxYear },
                        )
                    }
                    const includeCollectionFilter = lobby.collectionFilters.filter(
                        (collectionFilter) => collectionFilter.type === 'inclusion',
                    )
                    if (includeCollectionFilter.length > 0) {
                        gameQueryBuilder.andWhere('collection.id in (:includedCollectionIds)', {
                            includedCollectionIds: includeCollectionFilter.map(
                                (collectionFilter) => collectionFilter.collection.id,
                            ),
                        })
                    }
                    const includeGenreFilter = lobby.genreFilters.filter(
                        (genreFilter) => genreFilter.type === 'inclusion',
                    )
                    if (includeGenreFilter.length > 0) {
                        gameQueryBuilder.andWhere('genre.id in (:includedGenreIds)', {
                            includedGenreIds: includeGenreFilter.map(
                                (genreFilter) => genreFilter.genre.id,
                            ),
                        })
                    }
                    const includeThemeFilter = lobby.themeFilters.filter(
                        (themeFilter) => themeFilter.type === 'inclusion',
                    )
                    if (includeThemeFilter.length > 0) {
                        gameQueryBuilder.andWhere('theme.id in (:includedThemeIds)', {
                            includedThemeIds: includeThemeFilter.map(
                                (themeFilter) => themeFilter.theme.id,
                            ),
                        })
                    }

                    // Exclude filter
                    const excludeCollectionFilter = lobby.collectionFilters.filter(
                        (collectionFilter) => collectionFilter.type === 'exclusion',
                    )
                    if (excludeCollectionFilter.length > 0 || excludedCollectionIds.length > 0) {
                        gameQueryBuilder.andWhere((qb) => {
                            const subQuery = qb
                                .subQuery()
                                .select('1')
                                .from('games_collections', 'gc_exclude')
                                .where('gc_exclude.gameId = game.id')
                                .andWhere('gc_exclude.collectionId in (:excludedCollectionIds)', {
                                    excludedCollectionIds: [
                                        ...excludeCollectionFilter.map(
                                            (collectionFilter) => collectionFilter.collection.id,
                                        ),
                                        ...excludedCollectionIds,
                                    ],
                                })
                                .getQuery()

                            return `NOT EXISTS (${subQuery})`
                        })
                    }
                    const excludeGenreFilter = lobby.genreFilters.filter(
                        (genreFilter) => genreFilter.type === 'exclusion',
                    )
                    if (excludeGenreFilter.length > 0 || excludedGenreIds.length > 0) {
                        gameQueryBuilder.andWhere((qb) => {
                            const subQuery = qb
                                .subQuery()
                                .select('1')
                                .from('games_genres', 'gg_exclude')
                                .where('gg_exclude.gameId = game.id')
                                .andWhere('gg_exclude.genreId in (:excludedGenreIds)', {
                                    excludedGenreIds: [
                                        ...excludeGenreFilter.map(
                                            (genreFilter) => genreFilter.genre.id,
                                        ),
                                        ...excludedGenreIds,
                                    ],
                                })
                                .getQuery()

                            return `NOT EXISTS (${subQuery})`
                        })
                    }
                    const excludeThemeFilter = lobby.themeFilters.filter(
                        (themeFilter) => themeFilter.type === 'exclusion',
                    )
                    if (excludeThemeFilter.length > 0 || excludedThemeIds.length > 0) {
                        gameQueryBuilder.andWhere((qb) => {
                            const subQuery = qb
                                .subQuery()
                                .select('1')
                                .from('games_themes', 'gt_exclude')
                                .where('gt_exclude.gameId = game.id')
                                .andWhere('gt_exclude.themeId in (:excludedThemeIds)', {
                                    excludedThemeIds: [
                                        ...excludeThemeFilter.map(
                                            (themeFilter) => themeFilter.theme.id,
                                        ),
                                        ...excludedThemeIds,
                                    ],
                                })
                                .getQuery()

                            return `NOT EXISTS (${subQuery})`
                        })
                    }
                }

                const gameId = await this.getGameOrMusic(gameQueryBuilder)
                const game =
                    gameId === null
                        ? null
                        : await this.gameRepository.findOne({
                              relations: { collections: true, genres: true, themes: true },
                              where: { id: gameId.id },
                          })

                if (game !== null) {
                    const qb = this.gameToMusicRepository
                        .createQueryBuilder('gameToMusic')
                        .select('gameToMusic.id')
                        .leftJoinAndSelect('gameToMusic.music', 'music')
                        .andWhere('gameToMusic.game = :game')
                        .andWhere('music.duration >= :guessTime')
                        .andWhere('gameToMusic.deleted = 0')
                        .setParameter('game', game.id)
                        .setParameter('guessTime', lobby.guessTime)
                        .orderBy('RAND()')

                    if (lobbyMusics.length > 0) {
                        qb.andWhere('gameToMusic.id NOT IN (:musicIds)', {
                            musicIds: lobbyMusics.map((lobbyMusic) => lobbyMusic.gameToMusic.id),
                        })
                    }

                    const gameToMusicId = await this.getGameOrMusic(qb)
                    const gameToMusic =
                        gameToMusicId === null
                            ? null
                            : await this.gameToMusicRepository.findOne({
                                  relations: {
                                      music: { file: true },
                                      game: true,
                                      derivedGameToMusics: { game: true },
                                      originalGameToMusic: {
                                          game: true,
                                          derivedGameToMusics: { game: true },
                                      },
                                  },
                                  where: { id: gameToMusicId?.id },
                              })

                    if (!gameToMusic) {
                        excludedGameIds = [...excludedGameIds, game.id]
                        continue
                    }

                    // store already fetched games to prevent duplicates
                    alreadyFetchedGameIds = [...alreadyFetchedGameIds, game.id]

                    if (lobby.premium) {
                        alreadyFetchedCollectionIds = [
                            ...alreadyFetchedCollectionIds,
                            ...game.collections.map((collection) => collection.id),
                        ]
                        // Check if game collections have to be banned since it reached the filter limitation
                        if (lobby.limitAllCollectionsTo > 0) {
                            const collectionsReachedLimit = this.collectionsReachedLimit(
                                game.collections,
                                alreadyFetchedCollectionIds,
                                lobby,
                            )
                            if (collectionsReachedLimit.length > 0) {
                                excludedCollectionIds = [
                                    ...excludedCollectionIds,
                                    ...collectionsReachedLimit,
                                ]
                            }
                        }
                        const collectionsReachedFineTunedLimit =
                            this.collectionsReachedFineTunedLimit(
                                game.collections,
                                lobby.collectionFilters,
                                alreadyFetchedCollectionIds,
                            )
                        if (collectionsReachedFineTunedLimit.length > 0) {
                            excludedCollectionIds = [
                                ...excludedCollectionIds,
                                ...collectionsReachedFineTunedLimit,
                            ]
                        }

                        alreadyFetchedGenreIds = [
                            ...alreadyFetchedGenreIds,
                            ...game.genres.map((genre) => genre.id),
                        ]
                        // Check if game genres have to be banned since it reached the filter limitation
                        const genresReachedLimit = this.genresReachedLimit(
                            game.genres,
                            lobby.genreFilters,
                            alreadyFetchedGenreIds,
                        )
                        if (genresReachedLimit.length > 0) {
                            excludedGenreIds = [...excludedGenreIds, ...genresReachedLimit]
                        }

                        alreadyFetchedThemeIds = [
                            ...alreadyFetchedThemeIds,
                            ...game.themes.map((theme) => theme.id),
                        ]
                        // Check if game themes have to be banned since it reached the filter limitation
                        const themesReachedLimit = this.themesReachedLimit(
                            game.themes,
                            lobby.themeFilters,
                            alreadyFetchedThemeIds,
                        )
                        if (themesReachedLimit.length > 0) {
                            excludedThemeIds = [...excludedThemeIds, ...themesReachedLimit]
                        }
                    }

                    position += 1
                    const music = gameToMusic.music
                    const lobbyMusicDuration = lobby.playMusicOnAnswerReveal
                        ? lobby.guessTime + 10
                        : lobby.guessTime
                    const endAt =
                        lobbyMusicDuration > music.duration
                            ? music.duration
                            : this.getRandomFloat(lobbyMusicDuration, music.duration, 4)
                    const startAt =
                        lobbyMusicDuration > music.duration ? 0 : endAt - lobbyMusicDuration
                    const expectedAnswers = this.getExpectedAnswers(gameToMusic)
                    const hintModeGames = await this.getHintModeGames(
                        gameToMusic,
                        userId === 'unplayed' ? undefined : userIds,
                        lobby.allowDuplicates ? [] : alreadyFetchedGameIds,
                    )
                    const video = await this.getVideo(gameToMusic)
                    let startVideoAt = 0
                    if (video) {
                        startVideoAt = Math.floor(
                            Math.random() *
                                (Duration.fromISO(video.duration).as('seconds') - 10 + 1),
                        )
                    }
                    lobbyMusics = [
                        ...lobbyMusics,
                        this.lobbyMusicRepository.create({
                            lobby,
                            gameToMusic,
                            position,
                            startAt,
                            endAt,
                            expectedAnswers,
                            hintModeGames,
                            contributeToMissingData: [
                                LobbyDifficulties.Easy,
                                LobbyDifficulties.Medium,
                                LobbyDifficulties.Hard,
                            ].every((value) => {
                                return lobby.difficulty.includes(value)
                            })
                                ? false
                                : this.contributeMissingData,
                            video,
                            startVideoAt,
                            screenshots: await this.getScreenshots(gameToMusic),
                        }),
                    ]
                    userIdsRandom.splice(i, 1, undefined)
                    await this.gameToMusicRepository.save({
                        ...gameToMusic,
                        playNumber: gameToMusic.playNumber + 1,
                    })
                    loadedMusic += 1
                    this.lobbyGateway.sendLobbyLoadProgress(
                        lobby,
                        Math.round((loadedMusic / lobby.musicNumber) * 100),
                    )
                } else {
                    /**
                     * if we can't find a game with all users in lobby,
                     * retry with a random game if lobby allows it
                     */
                    if (userId.length === userIds.length) {
                        userIdsRandom.splice(
                            i,
                            1,
                            playedMusics < this.lobby.musicNumber ? 'random' : undefined,
                        )
                        continue
                    }
                    // If we can't find a random game, stop trying
                    if (userId === 'random') {
                        userIdsRandom.splice(i, 1, undefined)
                        continue
                    }
                    // If we can't find a game for this player, add a random player in the query
                    userIdsRandom = userIdsRandom.map((v) => {
                        if (Array.isArray(v) && v === userId) {
                            const userIdsFiltered = userIds.filter((uid) => !v?.includes(uid))
                            const random =
                                userIdsFiltered[Math.floor(Math.random() * userIdsFiltered.length)]
                            if (random) {
                                return [...v, random]
                            }
                        }
                        return v
                    })
                }
            }
        }

        if (lobbyMusics.length === 0) {
            lobby = this.lobbyRepository.create({ ...lobby, status: LobbyStatuses.Waiting })
            await this.lobbyRepository.save(lobby)
            await this.lobbyGateway.sendUpdateToRoom(lobby.code)
            this.lobbyGateway.sendLobbyToast(lobby, 'No music were found!')

            return
        }
        lobby = this.lobbyRepository.create({ ...lobby, status: LobbyStatuses.Playing })
        await this.lobbyMusicRepository.save(lobbyMusics)
        await this.lobbyRepository.save(lobby)
        await this.lobbyQueue.add('bufferMusic', lobby.code, {
            timeout: 10_000,
        })
    }

    private collectionsReachedLimit(
        collections: Collection[],
        alreadyFetchedCollectionIds: number[],
        lobby: Lobby,
    ): number[] {
        let collectionReachedLimit: number[] = []
        for (const collection of collections) {
            if (
                alreadyFetchedCollectionIds.filter((id) => id === collection.id).length >=
                lobby.limitAllCollectionsTo
            ) {
                collectionReachedLimit = [...collectionReachedLimit, collection.id]
            }
        }
        return collectionReachedLimit
    }

    private collectionsReachedFineTunedLimit(
        collections: Collection[],
        collectionFilters: LobbyCollectionFilter[],
        alreadyFetchedCollectionIds: number[],
    ): number[] {
        const gameCollectionFilters = collectionFilters.filter(
            (collectionFilter) =>
                collectionFilter.type === 'limitation' &&
                collections
                    .map((collection) => collection.id)
                    .includes(collectionFilter.collection.id),
        )
        let collectionReachedLimit: number[] = []
        for (const collectionFilterLimitation of gameCollectionFilters) {
            if (
                alreadyFetchedCollectionIds.filter(
                    (id) => id === collectionFilterLimitation.collection.id,
                ).length >= collectionFilterLimitation.limitation
            ) {
                collectionReachedLimit = [
                    ...collectionReachedLimit,
                    collectionFilterLimitation.collection.id,
                ]
            }
        }
        return collectionReachedLimit
    }

    private genresReachedLimit(
        genres: Genre[],
        genreFilters: LobbyGenreFilter[],
        alreadyFetchedGenreIds: number[],
    ): number[] {
        const gameGenreFilters = genreFilters.filter(
            (genreFilter) =>
                genreFilter.type === 'limitation' &&
                genres.map((genre) => genre.id).includes(genreFilter.genre.id),
        )
        let genreReachedLimit: number[] = []
        for (const genreFilter of gameGenreFilters) {
            if (
                alreadyFetchedGenreIds.filter((id) => id === genreFilter.genre.id).length >=
                genreFilter.limitation
            ) {
                genreReachedLimit = [...genreReachedLimit, genreFilter.genre.id]
            }
        }
        return genreReachedLimit
    }

    private themesReachedLimit(
        themes: Theme[],
        themeFilters: LobbyThemeFilter[],
        alreadyFetchedThemeIds: number[],
    ): number[] {
        const gameThemeFilters = themeFilters.filter(
            (themeFilter) =>
                themeFilter.type === 'limitation' &&
                themes.map((theme) => theme.id).includes(themeFilter.theme.id),
        )
        let themeReachedLimit: number[] = []
        for (const themeFilter of gameThemeFilters) {
            if (
                alreadyFetchedThemeIds.filter((id) => id === themeFilter.theme.id).length >=
                themeFilter.limitation
            ) {
                themeReachedLimit = [...themeReachedLimit, themeFilter.theme.id]
            }
        }
        return themeReachedLimit
    }

    private getExpectedAnswers(gameToMusic: GameToMusic): Game[] {
        let expectedAnswers: Game[] = []
        if (gameToMusic.type === GameToMusicType.Original) {
            expectedAnswers = [gameToMusic.game]
            if (gameToMusic.derivedGameToMusics) {
                expectedAnswers = [
                    ...expectedAnswers,
                    ...gameToMusic.derivedGameToMusics
                        .filter((derivedGameMusic) => !derivedGameMusic.deleted)
                        .map((derivedGameMusic) => derivedGameMusic.game),
                ]
            }
        } else {
            const originalGameToMusic = gameToMusic.originalGameToMusic
            if (originalGameToMusic !== null) {
                if (!originalGameToMusic.deleted) {
                    expectedAnswers = [originalGameToMusic.game]
                }
                if (originalGameToMusic.derivedGameToMusics) {
                    expectedAnswers = [
                        ...expectedAnswers,
                        ...originalGameToMusic.derivedGameToMusics
                            .filter((derivedGameMusic) => !derivedGameMusic.deleted)
                            .map((derivedGameMusic) => derivedGameMusic.game),
                    ]
                }
            }
        }
        return expectedAnswers
    }

    private async getGameOrMusic<T extends Game | GameToMusic>(
        baseQueryBuilder: SelectQueryBuilder<T>,
    ): Promise<Pick<T, 'id'> | null> {
        let gameOrGameMusic: T | null
        const qbGuessAccuracyIsNull = baseQueryBuilder.clone()
        qbGuessAccuracyIsNull.andWhere('gameToMusic.guessAccuracy IS NULL')

        const qbGuessAccuracyReflectsLobbyDifficulty = baseQueryBuilder.clone()
        qbGuessAccuracyReflectsLobbyDifficulty.andWhere(
            new Brackets((difficultyQb) => {
                if (this.lobby.difficulty.includes(LobbyDifficulties.Easy))
                    difficultyQb.orWhere('gameToMusic.guessAccuracy > 0.66')
                if (this.lobby.difficulty.includes(LobbyDifficulties.Medium))
                    difficultyQb.orWhere('gameToMusic.guessAccuracy BETWEEN 0.33 AND 0.66')
                if (this.lobby.difficulty.includes(LobbyDifficulties.Hard))
                    difficultyQb.orWhere('gameToMusic.guessAccuracy < 0.33')
            }),
        )

        if (this.contributeMissingData) {
            if (
                [LobbyDifficulties.Easy, LobbyDifficulties.Medium, LobbyDifficulties.Hard].every(
                    (value) => {
                        return this.lobby.difficulty.includes(value)
                    },
                )
            ) {
                gameOrGameMusic = await baseQueryBuilder.getOne()
            } else {
                gameOrGameMusic = await qbGuessAccuracyReflectsLobbyDifficulty.getOne()
                if (!gameOrGameMusic) {
                    gameOrGameMusic = await baseQueryBuilder.getOne()
                }
            }
        } else {
            if (
                [LobbyDifficulties.Easy, LobbyDifficulties.Medium, LobbyDifficulties.Hard].every(
                    (value) => {
                        return this.lobby.difficulty.includes(value)
                    },
                )
            ) {
                gameOrGameMusic = await baseQueryBuilder.getOne()
            } else {
                gameOrGameMusic = await qbGuessAccuracyReflectsLobbyDifficulty.getOne()
                if (this.lobby.allowContributeToMissingData && !gameOrGameMusic) {
                    this.contributeMissingData = true
                    gameOrGameMusic = await qbGuessAccuracyIsNull.getOne()
                    if (!gameOrGameMusic) {
                        gameOrGameMusic = await baseQueryBuilder.getOne()
                    }
                }
            }
        }
        return gameOrGameMusic
    }

    private async getHintModeGames(
        gameToMusic: GameToMusic,
        userIds?: number[],
        previousGameIds: number[] = [],
    ): Promise<Game[]> {
        let hintModeGames: Game[] = [gameToMusic.game]
        let excludedGamesIds = [gameToMusic.game.id, ...previousGameIds]
        if (gameToMusic.type === GameToMusicType.Original) {
            if (gameToMusic.derivedGameToMusics) {
                excludedGamesIds = [
                    ...excludedGamesIds,
                    ...gameToMusic.derivedGameToMusics.map(
                        (derivedGameMusic) => derivedGameMusic.game.id,
                    ),
                ]
            }
        } else {
            const originalGameToMusic = gameToMusic.originalGameToMusic
            if (originalGameToMusic !== null) {
                if (originalGameToMusic.derivedGameToMusics) {
                    excludedGamesIds = [
                        ...excludedGamesIds,
                        ...originalGameToMusic.derivedGameToMusics.map(
                            (derivedGameMusic) => derivedGameMusic.game.id,
                        ),
                    ]
                }
            }
        }
        if (userIds !== undefined) {
            const similarPlayedGamesWithMusics = await this.gameRepository
                .createQueryBuilder('game')
                .select('game.id')
                .innerJoin('game.musics', 'gameToMusic')
                .innerJoin('game.users', 'user')
                .innerJoin('game.isSimilarTo', 'similarGame')
                .andWhere('similarGame.id = :id', { id: gameToMusic.game.id })
                .andWhere('game.enabled = 1')
                .andWhere('user.id in (:userIds)', { userIds })
                .andWhere('game.id not in (:ids)', { ids: excludedGamesIds })
                .groupBy('game.id')
                .limit(3)
                .orderBy('RAND()')
                .getMany()
            hintModeGames = [...hintModeGames, ...similarPlayedGamesWithMusics]
            if (hintModeGames.length === 4) return hintModeGames
            excludedGamesIds = [...excludedGamesIds, ...hintModeGames.map((game) => game.id)]
            const playedGamesWithMusics = await this.gameRepository
                .createQueryBuilder('game')
                .select('game.id')
                .innerJoin('game.musics', 'gameToMusic')
                .innerJoin('game.users', 'user')
                .andWhere('game.enabled = 1')
                .andWhere('user.id in (:userIds)', { userIds })
                .andWhere('game.id not in (:ids)', { ids: excludedGamesIds })
                .groupBy('game.id')
                .limit(4 - hintModeGames.length)
                .orderBy('RAND()')
                .getMany()
            hintModeGames = [...hintModeGames, ...playedGamesWithMusics]
            if (hintModeGames.length === 4) return hintModeGames
            excludedGamesIds = [...excludedGamesIds, ...hintModeGames.map((game) => game.id)]
            const similarPlayedGames = await this.gameRepository
                .createQueryBuilder('game')
                .select('game.id')
                .innerJoin('game.users', 'user')
                .innerJoin('game.isSimilarTo', 'similarGame')
                .andWhere('similarGame.id = :id', { id: gameToMusic.game.id })
                .andWhere('game.enabled = 1')
                .andWhere('user.id in (:userIds)', { userIds })
                .andWhere('game.id not in (:ids)', { ids: excludedGamesIds })
                .groupBy('game.id')
                .limit(4 - hintModeGames.length)
                .orderBy('RAND()')
                .getMany()
            hintModeGames = [...hintModeGames, ...similarPlayedGames]
            if (hintModeGames.length === 4) return hintModeGames
            excludedGamesIds = [...excludedGamesIds, ...hintModeGames.map((game) => game.id)]
            const playedGames = await this.gameRepository
                .createQueryBuilder('game')
                .select('game.id')
                .innerJoin('game.users', 'user')
                .andWhere('game.enabled = 1')
                .andWhere('user.id in (:userIds)', { userIds })
                .andWhere('game.id not in (:ids)', { ids: excludedGamesIds })
                .groupBy('game.id')
                .limit(4 - hintModeGames.length)
                .orderBy('RAND()')
                .getMany()
            hintModeGames = [...hintModeGames, ...playedGames]
            if (hintModeGames.length === 4) return hintModeGames
            excludedGamesIds = [...excludedGamesIds, ...hintModeGames.map((game) => game.id)]
        }
        const gamesWithMusics = await this.gameRepository
            .createQueryBuilder('game')
            .select('game.id')
            .innerJoin('game.musics', 'gameToMusic')
            .andWhere('game.id not in (:ids)', { ids: excludedGamesIds })
            .groupBy('game.id')
            .limit(4 - hintModeGames.length)
            .orderBy('RAND()')
            .getMany()
        hintModeGames = [...hintModeGames, ...gamesWithMusics]
        if (hintModeGames.length === 4) return hintModeGames
        const games = await this.gameRepository
            .createQueryBuilder('game')
            .select('game.id')
            .andWhere('game.id not in (:ids)', { ids: excludedGamesIds })
            .groupBy('game.id')
            .limit(4 - hintModeGames.length)
            .orderBy('RAND()')
            .getMany()
        hintModeGames = [...hintModeGames, ...games]
        if (hintModeGames.length === 4) return hintModeGames
        throw new InternalServerErrorException()
    }

    private async getVideo(gameToMusic: GameToMusic): Promise<Video | null> {
        return this.videoRepository
            .createQueryBuilder('video')
            .andWhere('video.game = :game', { game: gameToMusic.game.id })
            .orderBy('RAND()')
            .getOne()
    }

    private getScreenshots(gameToMusic: GameToMusic): Promise<Screenshot[]> {
        return this.screenshotRepository
            .createQueryBuilder('screenshot')
            .andWhere('screenshot.game = :game', { game: gameToMusic.game.id })
            .orderBy('RAND()')
            .limit(2)
            .getMany()
    }

    getRandomFloat(min: number, max: number, decimals: number): number {
        const str = (Math.random() * (max - min) + min).toFixed(decimals)

        return parseFloat(str)
    }
}
