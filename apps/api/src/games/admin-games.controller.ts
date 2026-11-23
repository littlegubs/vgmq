import {
    BadRequestException,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FilesInterceptor } from '@nestjs/platform-express'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Request } from 'express'
import { IsNull, Repository } from 'typeorm'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { DiscordService } from '../discord/discord.service'
import { Role } from '../users/role.enum'
import { Roles } from '../users/roles.decorator'
import { RolesGuard } from '../users/roles.guard'
import { User } from '../users/user.entity'
import { GamesImportDto } from './dto/games-import.dto'
import { GameAlbum } from './entity/game-album.entity'
import { GameToMusic } from './entity/game-to-music.entity'
import { Game } from './entity/game.entity'
import { IgdbHttpService } from './http/igdb.http.service'
import { GamesService } from './services/games.service'
import { IgdbService } from './services/igdb.service'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/games')
export class AdminGamesController {
    constructor(
        private gamesService: GamesService,
        private igdbService: IgdbService,
        @InjectRepository(Game) private gamesRepository: Repository<Game>,
        @InjectRepository(GameToMusic) private gameToMusicRepository: Repository<GameToMusic>,
        private configService: ConfigService,
        private igdbHttpService: IgdbHttpService,
        @InjectRepository(GameAlbum) private gameAlbumRepository: Repository<GameAlbum>,
        private discordService: DiscordService,
    ) {}

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('import')
    @HttpCode(201)
    async importFromIgdb(
        @Query() query: GamesImportDto,
        @Req() request: Request,
    ): Promise<string[]> {
        const [igdbGame] = await this.igdbHttpService.getDataFromUrl(query.url)

        if (!igdbGame) throw new NotFoundException('the game was not found')

        const user = request.user as User
        const game = await this.igdbService.import(igdbGame, user)
        let gamesImported = [game.name]
        let { parent, versionParent } = game
        while (parent) {
            gamesImported = [...gamesImported, parent.name]
            parent = parent.parent
        }
        while (versionParent) {
            gamesImported = [...gamesImported, versionParent.name]
            versionParent = versionParent.versionParent
        }

        return gamesImported
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('/:slug')
    async get(@Param('slug') slug: string): Promise<Game> {
        return this.gamesService.getGameWithMusics(slug)
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Patch('/:slug/toggle')
    async toggle(@Param('slug') slug: string): Promise<Game> {
        return this.gamesService.toggle(slug)
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('/:slug/purge')
    async purge(@Param('slug') slug: string, @Req() request: Request): Promise<void> {
        const gameToPurge = await this.gamesRepository.findOne({
            relations: { musics: true, albums: true },
            where: {
                slug,
            },
        })
        if (gameToPurge === null) {
            throw new NotFoundException()
        }
        const user = request.user as User

        let content = 'Game purged: The following have been deleted:\n'
        if (gameToPurge.musics.length > 0) {
            content += '- musics:\n'
            for (const gameToMusic of gameToPurge.musics) {
                content += `  - (#${gameToMusic.id}) ${
                    gameToMusic.title ?? gameToMusic.music.title
                } - ${gameToMusic.artist ?? gameToMusic.music.artist}\n`
            }
        }
        if (gameToPurge.albums.length > 0) {
            content += '- albums:\n'
            for (const album of gameToPurge.albums) {
                content += `  - (#${album.id}) ${album.name}\n`
            }
        }

        content += '\n'
        content += `⚠️<@${this.configService.get(
            'DISCORD_GUBS_ID',
        )}> can restore these files within 30 days. After that, they will be permanently deleted.\n`
        content += 'Albums cannot be retrieved.'

        // Split message every 6000 characters to prevent Discord Bad Request
        for (let i = 0; i < content.length; i += 4000) {
            const chunk = content.slice(i, i + 4000)
            // don't try catch here, the message MUST be sent before deleting the file
            const response = await this.discordService.sendUpdateForGame({
                game: gameToPurge,
                content: chunk,
                user,
                type: 'danger',
            })

            // TODO I know I must do this in an interceptor, but eh, this will work for now
            if (response?.headers['x-ratelimit-remaining'] === '0') {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, response?.headers['x-ratelimit-reset-after'] * 1000)
                })
            }
        }
        for (const gameToMusic of gameToPurge.musics) {
            await this.gameToMusicRepository.save({
                ...gameToMusic,
                deleted: true,
                updatedBy: user,
            })
        }
        for (const album of gameToPurge.albums) {
            await this.gameAlbumRepository.remove(album)
        }
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @UseInterceptors(
        FilesInterceptor('files', 200, {
            limits: {
                fileSize: 157286400, // 150 MB
            },
            fileFilter(req, file, callback) {
                if (
                    !['audio/mpeg', 'audio/mp3'].includes(file.mimetype) ||
                    !new RegExp(/.\.(mp3)$/i).test(file.originalname)
                ) {
                    callback(new BadRequestException('File must be a valid mp3 file!'), false)
                }
                callback(null, true)
            },
        }),
    )
    @Roles(Role.Admin, Role.SuperAdmin)
    @Post(':slug/musics')
    async uploadMusic(
        @Param('slug') slug: string,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Req() request: Request,
    ): Promise<Game> {
        const user = request.user as User
        const game = await this.gamesRepository.findOne({
            where: {
                slug,
            },
        })
        if (game === null) {
            throw new NotFoundException()
        }

        await this.gamesService.uploadMusics(game, files, user)
        return this.gamesService.getGameWithMusics(game.slug)
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Post(':slug/create-album')
    async createAlbum(@Param('slug') slug: string, @Req() request: Request): Promise<Game> {
        const user = request.user as User
        const game = await this.gamesRepository.findOne({
            where: {
                slug,
            },
        })
        if (game === null) {
            throw new NotFoundException()
        }
        await this.gameAlbumRepository.save({
            name: 'new Album',
            date: dayjs().year().toString(),
            createdBy: user,
            updatedBy: user,
            game,
        })
        return this.gamesService.getGameWithMusics(game.slug)
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get(':slug/generate-albums')
    async generateAlbums(@Param('slug') slug: string, @Req() request: Request): Promise<Game> {
        const user = request.user as User
        const game = await this.gamesRepository.findOne({
            relations: {
                musics: {
                    game: true,
                    music: {
                        file: true,
                    },
                },
            },
            where: {
                slug,
                musics: {
                    album: IsNull(),
                },
            },
        })
        if (game === null) {
            throw new NotFoundException()
        }
        await this.gamesService.generateAlbumFromExistingFiles(game, user)
        return this.gamesService.getGameWithMusics(game.slug)
    }
}
