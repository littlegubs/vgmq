import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    Patch,
    Post,
    Req,
    Response,
    StreamableFile,
    UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Request, Response as ExpressReponse } from 'express'
import { Repository } from 'typeorm'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { DiscordService } from '../discord/discord.service'
import { Role } from '../users/role.enum'
import { Roles } from '../users/roles.decorator'
import { RolesGuard } from '../users/roles.guard'
import { User } from '../users/user.entity'
import { AddDerivedGameToMusicDto } from './dto/add-derived-game-to-music.dto'
import { GameToMusicEditDto } from './dto/game-to-music-edit.dto'
import { LinkGameToMusicDto } from './dto/link-game-to-music.dto'
import { GameToMusic, GameToMusicType } from './entity/game-to-music.entity'
import { Game } from './entity/game.entity'
import { StorageService } from '../storage/storage.interface'
import { PRIVATE_STORAGE } from '../storage/storage.constants'

@Controller('admin/game-to-music')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.SuperAdmin)
export class GameToMusicController {
    constructor(
        @InjectRepository(GameToMusic) private gameToMusicRepository: Repository<GameToMusic>,
        @InjectRepository(Game) private gameRepository: Repository<Game>,
        @Inject(PRIVATE_STORAGE) private privatesStorageService: StorageService,
        private discordService: DiscordService,
        private configService: ConfigService,
    ) {}

    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() request: Request): Promise<void> {
        const user = request.user as User
        const gameToMusic = await this.gameToMusicRepository.findOne({
            relations: {
                game: true,
                derivedGameToMusics: true,
            },
            where: {
                id,
            },
        })
        if (!gameToMusic) {
            throw new NotFoundException()
        }
        let content = 'Music deleted:\n'
        content += `- **id**: ${gameToMusic.id}\n`
        content += `- **title**: ${gameToMusic.title ?? gameToMusic.music.title}\n`
        content += `- **artist**: ${gameToMusic.artist ?? gameToMusic.music.artist}\n\n`
        content += `⚠️<@${this.configService.get(
            'DISCORD_GUBS_ID',
        )}> can restore this file within 30 days. After that, it will be permanently deleted.\n`
        // don't try catch here, the message MUST be sent before deleting the file
        await this.discordService.sendUpdateForGame({
            game: gameToMusic.game,
            content: content,
            user,
            type: 'danger',
        })

        await this.gameToMusicRepository.save({ ...gameToMusic, deleted: true, updatedBy: user })
    }

    @Get('/:id/listen')
    async listen(
        @Param('id') id: number,
        @Req() request: Request,
        @Response({ passthrough: true }) res: ExpressReponse,
    ): Promise<StreamableFile> {
        const gameToMusic = await this.gameToMusicRepository.findOneBy({
            id,
        })
        if (!gameToMusic) {
            throw new NotFoundException()
        }
        const buffer = await this.privatesStorageService.getObject(gameToMusic.music.file.path)
        res.set({
            'Content-Type': 'audio/mpeg',
        })
        return new StreamableFile(buffer)
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Patch('/:id')
    async edit(
        @Req() request: Request,
        @Param('id') id: number,
        @Body() musicEditDto: GameToMusicEditDto,
    ): Promise<GameToMusic> {
        const user = request.user as User
        const gameToMusic = await this.gameToMusicRepository.findOne({
            relations: { game: true, album: true, updatedBy: true },
            where: {
                id: id,
            },
        })
        if (!gameToMusic) {
            throw new NotFoundException()
        }
        return this.gameToMusicRepository.save({
            ...gameToMusic,
            ...(musicEditDto.title && { title: musicEditDto.title }),
            ...(musicEditDto.artist && { artist: musicEditDto.artist }),
            ...(musicEditDto.disk !== undefined && { disk: musicEditDto.disk }),
            ...(musicEditDto.track && { track: musicEditDto.track }),
            ...(musicEditDto.album !== undefined && { album: musicEditDto.album }),
            updatedBy: user,
        })
    }

    @Post('/:id/add-derived')
    async addDerived(
        @Req() request: Request,
        @Param('id') id: number,
        @Body() derivedGameToMusicDto: AddDerivedGameToMusicDto,
    ): Promise<GameToMusic | null> {
        const user = request.user as User
        const gameToMusic = await this.gameToMusicRepository.findOne({
            relations: { game: true },
            where: {
                id,
                type: GameToMusicType.Original,
            },
        })
        if (!gameToMusic) {
            throw new NotFoundException()
        }
        const game = await this.gameRepository.findOneBy({
            id: derivedGameToMusicDto.gameId,
        })
        if (!game) {
            throw new BadRequestException()
        }
        await this.gameToMusicRepository.save({
            ...gameToMusic,
            id: undefined,
            originalGameToMusic: gameToMusic,
            game,
            type: GameToMusicType.Reused,
            playNumber: 0,
            guessAccuracy: null,
            addedBy: user,
        })

        try {
            let content = 'Music added:\n'
            content += `- **title**: ${gameToMusic.title ?? gameToMusic.music.title}\n`
            content += `- **artist**: ${gameToMusic.artist ?? gameToMusic.music.artist}\n`
            content += `from [${gameToMusic.game.name}](${this.configService.get(
                'VGMQ_CLIENT_URL',
            )}/admin/games/${gameToMusic.game.slug})`
            void this.discordService.sendUpdateForGame({
                game,
                content: content,
                user,
                type: 'success',
            })
        } catch (e) {
            console.error(e)
        }

        return this.gameToMusicRepository.findOne({
            relations: ['derivedGameToMusics', 'derivedGameToMusics.game'],
            where: {
                id,
            },
        })
    }

    @Patch('/:id/link')
    async link(
        @Req() request: Request,
        @Param('id') id: number,
        @Body() linkGameToMusicDto: LinkGameToMusicDto,
    ): Promise<GameToMusic | null> {
        const user = request.user as User
        const originalGameToMusic = await this.gameToMusicRepository.findOne({
            relations: { game: true },
            where: {
                id,
                type: GameToMusicType.Original,
            },
        })
        if (!originalGameToMusic) {
            throw new NotFoundException()
        }
        const gameToMusicToBeDerived = await this.gameToMusicRepository.findOne({
            relations: { game: true },
            where: {
                id: linkGameToMusicDto.gameToMusicId,
            },
        })
        if (!gameToMusicToBeDerived) {
            throw new NotFoundException()
        }
        if (gameToMusicToBeDerived.type === GameToMusicType.Reused) {
            throw new BadRequestException(
                "The music you're trying to link is already linked to another game",
            )
        }
        if (gameToMusicToBeDerived.game.id === originalGameToMusic.game.id) {
            throw new BadRequestException('A link cannot be made on the same game')
        }

        await this.gameToMusicRepository.save({
            ...gameToMusicToBeDerived,
            originalGameToMusic,
            type: GameToMusicType.Reused,
        })

        try {
            const content = `🔗 Linked music \n**${
                originalGameToMusic.title ?? originalGameToMusic.music.title
            } - ${originalGameToMusic.artist ?? originalGameToMusic.music.artist}**\nwith\n**${
                gameToMusicToBeDerived.title ?? gameToMusicToBeDerived.music.title
            } - ${gameToMusicToBeDerived.artist ?? gameToMusicToBeDerived.music.artist}** from [${
                gameToMusicToBeDerived.game.name
            }](${this.configService.get('VGMQ_CLIENT_URL')}/admin/games/${
                gameToMusicToBeDerived.game.slug
            })\n`

            void this.discordService.sendUpdateForGame({
                game: originalGameToMusic.game,
                content,
                user,
                type: 'success',
            })
        } catch (e) {
            console.error(e)
        }

        return this.gameToMusicRepository.findOne({
            relations: ['derivedGameToMusics', 'derivedGameToMusics.game'],
            where: {
                id,
            },
        })
    }

    @Patch('/:id/unlink')
    async unlink(
        @Req() request: Request,
        @Param('id') id: number,
        @Body() linkGameToMusicDto: LinkGameToMusicDto,
    ): Promise<GameToMusic | null> {
        const user = request.user as User
        const originalGameToMusic = await this.gameToMusicRepository.findOne({
            relations: { game: true },
            where: {
                id,
                type: GameToMusicType.Original,
            },
        })
        if (!originalGameToMusic) {
            throw new NotFoundException()
        }
        const gameToMusicToUnlink = await this.gameToMusicRepository.findOne({
            relations: { originalGameToMusic: true, game: true },
            where: {
                id: linkGameToMusicDto.gameToMusicId,
                type: GameToMusicType.Reused,
                originalGameToMusic: { id: originalGameToMusic.id },
            },
        })
        if (!gameToMusicToUnlink) {
            throw new NotFoundException()
        }

        await this.gameToMusicRepository.save({
            ...gameToMusicToUnlink,
            originalGameToMusic: null,
            type: GameToMusicType.Original,
        })

        try {
            const content = `⛓️‍💥 UnLinked music \n**${
                originalGameToMusic.title ?? originalGameToMusic.music.title
            } - ${originalGameToMusic.artist ?? originalGameToMusic.music.artist}**\nwith\n**${
                gameToMusicToUnlink.title ?? gameToMusicToUnlink.music.title
            } - ${gameToMusicToUnlink.artist ?? gameToMusicToUnlink.music.artist}** from [${
                gameToMusicToUnlink.game.name
            }](${this.configService.get('VGMQ_CLIENT_URL')}/admin/games/${
                gameToMusicToUnlink.game.slug
            })\n`

            void this.discordService.sendUpdateForGame({
                game: originalGameToMusic.game,
                content,
                user,
                type: 'danger',
            })
        } catch (e) {
            console.error(e)
        }

        return this.gameToMusicRepository.findOne({
            relations: ['derivedGameToMusics', 'derivedGameToMusics.game'],
            where: {
                id,
            },
        })
    }
}
