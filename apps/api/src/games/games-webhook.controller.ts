import { InjectQueue } from '@nestjs/bull'
import { Body, Controller, HttpCode, Post, Req, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { Request } from 'express'
import { Repository } from 'typeorm'

import { User } from '../users/user.entity'
import { Game } from './entity/game.entity'
import { IgdbGame } from './igdb.type'
import { GamesService } from './services/games.service'
import { IgdbService } from './services/igdb.service'

@Controller('games/webhook')
export class WebhookController {
    constructor(
        private gamesService: GamesService,
        private igdbService: IgdbService,
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private configService: ConfigService,
        @InjectQueue('igdbWebhook')
        private igdbWebhookQueue: Queue,
    ) {}

    @Post('/update')
    @HttpCode(200)
    async update(@Body() body: IgdbGame, @Req() request: Request): Promise<void> {
        if (request.header('X-Secret') !== this.configService.get('IGDB_WEBHOOK_SECRET')) {
            throw new UnauthorizedException()
        }

        await this.igdbWebhookQueue.add('gameUpdate', body, { removeOnComplete: true })
        return
    }

    @Post('/delete')
    @HttpCode(200)
    async delete(@Body() body: IgdbGame, @Req() request: Request): Promise<void> {
        if (request.header('X-Secret') !== this.configService.get('IGDB_WEBHOOK_SECRET')) {
            throw new UnauthorizedException()
        }

        await this.igdbWebhookQueue.add('gameRemove', body, { removeOnComplete: true })
        return
    }
}
