import { HttpModule } from '@nestjs/axios'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Collection } from '../games/entity/collection.entity'
import { GameToMusic } from '../games/entity/game-to-music.entity'
import { Game } from '../games/entity/game.entity'
import { Genre } from '../games/entity/genre.entity'
import { MusicAccuracy } from '../games/entity/music-accuracy.entity'
import { Music } from '../games/entity/music.entity'
import { Screenshot } from '../games/entity/screenshot.entity'
import { Theme } from '../games/entity/theme.entity'
import { Video } from '../games/entity/video.entity'
import { OauthPatreon } from '../oauth/entities/oauth-patreon.entity'
import { PatreonService } from '../oauth/services/patreon.service'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { LobbyCollectionFilter } from './entities/lobby-collection-filter.entity'
import { LobbyGenreFilter } from './entities/lobby-genre-filter.entity'
import { LobbyMessage } from './entities/lobby-message.entity'
import { LobbyMusic } from './entities/lobby-music.entity'
import { LobbyReport } from './entities/lobby-report.entity'
import { LobbyThemeFilter } from './entities/lobby-theme-filter.entity'
import { LobbyUser } from './entities/lobby-user.entity'
import { Lobby } from './entities/lobby.entity'
import { LobbyFileGateway } from './lobby-file.gateway'
import { LobbyListGateway } from './lobby-list.gateway'
import { LobbyController } from './lobby.controller'
import { LobbyGateway } from './lobby.gateway'
import { LobbyProcessor } from './lobby.processor'
import { LobbyMusicLoaderService } from './services/lobby-music-loader.service'
import { LobbyUserService } from './services/lobby-user.service'
import { LobbyService } from './services/lobby.service'
import { LobbyUserSubscriber } from './subscribers/lobby-user.subscriber'
import { LobbySubscriber } from './subscribers/lobby.subscriber'
import { LobbyStatService } from './services/lobby-stat.service'
import { LobbyMusicSubscriber } from './subscribers/lobby-music.subscriber'
import { ModerationService } from '../utils/moderation.service'

@Module({
    controllers: [LobbyController],
    imports: [
        TypeOrmModule.forFeature([
            Lobby,
            LobbyMessage,
            LobbyReport,
            LobbyMusic,
            LobbyUser,
            Game,
            GameToMusic,
            Music,
            User,
            MusicAccuracy,
            Video,
            Screenshot,
            Collection,
            Genre,
            Theme,
            LobbyCollectionFilter,
            LobbyGenreFilter,
            LobbyThemeFilter,
            OauthPatreon,
        ]),
        BullModule.registerQueue({
            name: 'lobby',
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: () => {
                return {
                    secret: process.env.JWT_SECRET,
                }
            },
        }),
        HttpModule,
    ],
    providers: [
        LobbyService,
        LobbyGateway,
        LobbyListGateway,
        LobbyFileGateway,
        LobbyProcessor,
        LobbySubscriber,
        LobbyUserSubscriber,
        LobbyMusicSubscriber,
        LobbyUserService,
        UsersService,
        LobbyMusicLoaderService,
        PatreonService,
        LobbyStatService,
        ModerationService,
    ],
})
export class LobbyModule {}
