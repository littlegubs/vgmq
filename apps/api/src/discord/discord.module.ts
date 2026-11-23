import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Game } from '../games/entity/game.entity'
import { User } from '../users/user.entity'
import { DiscordHttpService } from './discord.http.service'
import { DiscordService } from './discord.service'

@Module({
    imports: [TypeOrmModule.forFeature([Game, User]), HttpModule],
    providers: [DiscordHttpService, DiscordService],
})
export class DiscordModule {}
