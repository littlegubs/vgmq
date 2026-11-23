import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { File } from '../entity/file.entity'
import { LobbyMusic } from '../lobbies/entities/lobby-music.entity'
import { LobbyUser } from '../lobbies/entities/lobby-user.entity'
import { Lobby } from '../lobbies/entities/lobby.entity'
import { User } from '../users/user.entity'
import { SystemController } from './system.controller'
import { AdminController } from './admin.controller'
import { ReportsController } from './reports.controller'
import { LobbyReport } from '../lobbies/entities/lobby-report.entity'
import { LobbyMessage } from '../lobbies/entities/lobby-message.entity'

@Module({
    controllers: [AdminController, SystemController, ReportsController],
    imports: [
        TypeOrmModule.forFeature([
            File,
            User,
            Lobby,
            LobbyMusic,
            LobbyUser,
            LobbyReport,
            LobbyMessage,
        ]),
        BullModule.registerQueue({
            name: 'lobby',
        }),
    ],
})
export class AdminModule {}
