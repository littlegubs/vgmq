import { youtube } from '@googleapis/youtube'
import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { DateTime } from 'luxon'
import { Repository } from 'typeorm'

import { User } from '../../users/user.entity'
import { AlternativeName } from '../entity/alternative-name.entity'
import { Collection } from '../entity/collection.entity'
import { ColorPalette } from '../entity/color-palette.entity'
import { Cover } from '../entity/cover.entity'
import { Game } from '../entity/game.entity'
import { Genre } from '../entity/genre.entity'
import { Platform } from '../entity/platform.entity'
import { Screenshot } from '../entity/screenshot.entity'
import { Theme } from '../entity/theme.entity'
import { Video } from '../entity/video.entity'
import { IgdbHttpService } from '../http/igdb.http.service'
import { IgdbGame } from '../igdb.type'
import { Vibrant } from 'node-vibrant/node'
import { GameType } from '../entity/game-type.entity'

@Injectable()
export class IgdbService {
    constructor(
        private igdbHttpService: IgdbHttpService,
        private configService: ConfigService,
        @InjectRepository(Game) private gamesRepository: Repository<Game>,
        @InjectRepository(Cover) private coversRepository: Repository<Cover>,
        @InjectRepository(GameType) private gameTypeRepository: Repository<GameType>,
        @InjectRepository(AlternativeName)
        private alternativeNamesRepository: Repository<AlternativeName>,
        @InjectRepository(ColorPalette) private colorPaletteRepository: Repository<ColorPalette>,
        @InjectRepository(Platform) private platformRepository: Repository<Platform>,
        @InjectRepository(Video) private videoRepository: Repository<Video>,
        @InjectRepository(Screenshot) private screenshotRepository: Repository<Screenshot>,
        @InjectRepository(Genre) private genreRepository: Repository<Genre>,
        @InjectRepository(Theme) private themeRepository: Repository<Theme>,
        @InjectRepository(Collection) private collectionRepository: Repository<Collection>,
        @InjectQueue('game') private gameQueue: Queue,
    ) {}

    async import(
        igdbGame: IgdbGame,
        user?: User,
        options: { keepEnableAsIs: boolean } = { keepEnableAsIs: false },
    ): Promise<Game> {
        const oldGame = await this.gamesRepository.findOne({
            where: {
                igdbId: igdbGame.id,
            },
            relations: ['alternativeNames', 'cover'],
        })

        let game = this.gamesRepository.create({
            igdbId: igdbGame.id,
            name: igdbGame.name,
            url: igdbGame.url,
            slug: igdbGame.slug,
            firstReleaseDate: igdbGame.first_release_date
                ? DateTime.fromSeconds(igdbGame.first_release_date).toISO()
                : null,
            ...(!options.keepEnableAsIs && { enabled: true }),
            ...(user && oldGame === null && { addedBy: user }),
        })

        const cover = await this.getCover(game, igdbGame.cover)
        const gameType = await this.getGameType(igdbGame.game_type)

        const alternativeNames = await this.handleAlternativeNames(igdbGame.alternative_names)
        const videos = await this.handleVideos(igdbGame.videos)
        const screenshots = await this.handleScreenshots(igdbGame.screenshots)

        const [parent, versionParent] = await Promise.all([
            this.getParent(igdbGame.parent_game, options),
            this.getParent(igdbGame.version_parent, options),
        ])

        const platforms = await this.handlePlatforms(igdbGame.platforms)
        const genres = await this.handleGenres(igdbGame.genres)
        const themes = await this.handleThemes(igdbGame.themes)
        const collections = await this.handleCollections(igdbGame.collections)

        game = {
            ...game,
            parent,
            versionParent,
            type: gameType,
            ...(cover ? { cover } : undefined),
            ...(alternativeNames ? { alternativeNames } : undefined),
            ...(platforms ? { platforms } : undefined),
            ...(videos ? { videos: videos.filter((v) => v !== undefined) as Video[] } : undefined),
            ...(screenshots ? { screenshots } : undefined),
            ...(genres ? { genres } : undefined),
            ...(themes ? { themes } : undefined),
            ...(collections ? { collections } : undefined),
        }

        game = await this.updateOrCreateGame(game, oldGame)

        await this.gameQueue.add('getSimilarGames', game.id, { removeOnComplete: true })
        return game
    }

    async getParent(
        parent?: {
            id: number
            url: string
        },
        options: { keepEnableAsIs: boolean } = { keepEnableAsIs: false },
    ): Promise<Promise<Game | undefined> | undefined> {
        if (parent) {
            const [igdbGame] = await this.igdbHttpService.getDataFromUrl(parent.url)

            return igdbGame ? this.import(igdbGame, undefined, options) : undefined
        }
    }

    async getCover(
        game: Game,
        igdbCover?: {
            id: number
            image_id: string
        },
    ): Promise<Cover | undefined> {
        if (igdbCover) {
            const cover = await this.coversRepository.findOne({
                relations: {
                    colorPalette: true,
                },
                where: {
                    igdbId: igdbCover.id,
                },
            })
            if (cover !== null) {
                if (cover.colorPalette) {
                    return cover
                }
                const colorPalette = await Vibrant.from(
                    `https://images.igdb.com/igdb/image/upload/t_1080p/${igdbCover.image_id}.jpg`,
                ).getPalette()
                return {
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
                }
            }
            const colorPalette = await Vibrant.from(
                `https://images.igdb.com/igdb/image/upload/t_1080p/${igdbCover.image_id}.jpg`,
            ).getPalette()
            return this.coversRepository.create({
                igdbId: igdbCover.id,
                imageId: igdbCover.image_id,
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

    async getGameType(igdbGameType: { id: number; type: string }): Promise<GameType> {
        const gameType = await this.gameTypeRepository.findOne({
            where: {
                igdbId: igdbGameType.id,
            },
        })
        if (gameType !== null) {
            return gameType
        }
        return this.gameTypeRepository.create({
            igdbId: igdbGameType.id,
            type: igdbGameType.type,
        })
    }

    updateOrCreateGame(game: Game, oldGame: Game | null): Promise<Game> {
        return this.gamesRepository.save(oldGame ? { ...game, id: oldGame.id } : game)
    }

    handleAlternativeNames(
        igdbAlternativeNames?: IgdbGame['alternative_names'],
    ): Promise<AlternativeName[]> {
        if (Array.isArray(igdbAlternativeNames) && igdbAlternativeNames.length > 0) {
            return Promise.all(
                igdbAlternativeNames.map(async (igdbAlternativeName) => {
                    const alternativeName = await this.alternativeNamesRepository.findOneBy({
                        igdbId: igdbAlternativeName.id,
                    })
                    if (alternativeName === null) {
                        return this.alternativeNamesRepository.create({
                            igdbId: igdbAlternativeName.id,
                            name: igdbAlternativeName.name,
                        })
                    }
                    return this.alternativeNamesRepository.save<AlternativeName>({
                        ...alternativeName,
                        name: igdbAlternativeName.name,
                    })
                }),
            )
        }
        return Promise.resolve([])
    }

    async handleVideos(igdbVideos?: IgdbGame['videos']): Promise<Array<Video | undefined>> {
        if (!this.configService.get('YOUTUBE_API_AUTH')) {
            return [undefined]
        }
        const youtubeApi = youtube({
            version: 'v3',
            auth: this.configService.get('YOUTUBE_API_AUTH'),
        })

        if (Array.isArray(igdbVideos) && igdbVideos.length > 0) {
            return Promise.all(
                igdbVideos.map(async (igdbVideo) => {
                    const video = await this.videoRepository.findOneBy({
                        igdbId: igdbVideo.id,
                    })
                    if (video !== null) {
                        return video
                    }
                    const { data } = await youtubeApi.videos.list({
                        id: [igdbVideo.video_id],
                        part: ['contentDetails'],
                    })
                    if (data.items?.[0]?.contentDetails?.duration) {
                        return this.videoRepository.create({
                            igdbId: igdbVideo.id,
                            videoId: igdbVideo.video_id,
                            duration: data.items[0].contentDetails.duration,
                        })
                    }
                    return undefined
                }),
            )
        }
        return Promise.resolve([])
    }

    async handleScreenshots(igdbImages?: IgdbGame['screenshots']): Promise<Screenshot[]> {
        if (Array.isArray(igdbImages) && igdbImages.length > 0) {
            return Promise.all(
                igdbImages.map(async (igdbImage) => {
                    const screenshot = await this.screenshotRepository.findOneBy({
                        igdbId: igdbImage.id,
                    })
                    if (screenshot !== null) {
                        return screenshot
                    }
                    return this.screenshotRepository.save({
                        igdbId: igdbImage.id,
                        imageId: igdbImage.image_id,
                    })
                }),
            )
        }
        return Promise.resolve([])
    }

    handlePlatforms(igdbPlatforms?: IgdbGame['platforms']): Promise<Platform[]> {
        if (Array.isArray(igdbPlatforms) && igdbPlatforms.length > 0) {
            return Promise.all(
                igdbPlatforms.map(async (igdbPlatform) => {
                    const platform = await this.platformRepository.findOneBy({
                        igdbId: igdbPlatform.id,
                    })
                    if (platform === null) {
                        return this.platformRepository.create({
                            igdbId: igdbPlatform.id,
                            name: igdbPlatform.name,
                            abbreviation: igdbPlatform.abbreviation ?? igdbPlatform.name,
                        })
                    }
                    return this.platformRepository.save<Platform>({
                        ...platform,
                        name: igdbPlatform.name,
                        abbreviation: igdbPlatform.abbreviation ?? igdbPlatform.name,
                    })
                }),
            )
        }
        return Promise.resolve([])
    }

    handleGenres(igdbGenres?: IgdbGame['genres']): Promise<Genre[]> {
        if (Array.isArray(igdbGenres) && igdbGenres.length > 0) {
            return Promise.all(
                igdbGenres.map(async (igdbGenre) => {
                    const genre = await this.genreRepository.findOneBy({
                        igdbId: igdbGenre.id,
                    })
                    if (genre === null) {
                        return this.genreRepository.create({
                            igdbId: igdbGenre.id,
                            name: igdbGenre.name,
                            slug: igdbGenre.slug,
                        })
                    }
                    return this.genreRepository.save({
                        ...genre,
                        name: igdbGenre.name,
                        slug: igdbGenre.slug,
                    })
                }),
            )
        }
        return Promise.resolve([])
    }

    handleThemes(igdbThemes?: IgdbGame['themes']): Promise<Theme[]> {
        if (Array.isArray(igdbThemes) && igdbThemes.length > 0) {
            return Promise.all(
                igdbThemes.map(async (igdbTheme) => {
                    const theme = await this.themeRepository.findOneBy({
                        igdbId: igdbTheme.id,
                    })
                    if (theme === null) {
                        return this.themeRepository.create({
                            igdbId: igdbTheme.id,
                            name: igdbTheme.name,
                            slug: igdbTheme.slug,
                        })
                    }
                    return this.themeRepository.save({
                        ...theme,
                        name: igdbTheme.name,
                        slug: igdbTheme.slug,
                    })
                }),
            )
        }
        return Promise.resolve([])
    }

    handleCollections(igdbCollections?: IgdbGame['collections']): Promise<Collection[]> {
        if (Array.isArray(igdbCollections) && igdbCollections.length > 0) {
            return Promise.all(
                igdbCollections.map(async (igdbCollection) => {
                    const collection = await this.collectionRepository.findOneBy({
                        igdbId: igdbCollection.id,
                    })
                    if (collection === null) {
                        return this.collectionRepository.create({
                            igdbId: igdbCollection.id,
                            name: igdbCollection.name,
                            slug: igdbCollection.slug,
                        })
                    }
                    return this.collectionRepository.save({
                        ...collection,
                        name: igdbCollection.name,
                        slug: igdbCollection.slug,
                    })
                }),
            )
        }
        return Promise.resolve([])
    }
}
