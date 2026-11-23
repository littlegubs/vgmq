import { HttpModule } from '@nestjs/axios'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DiscordHttpService } from '../discord/discord.http.service'
import { DiscordService } from '../discord/discord.service'
import { File } from '../entity/file.entity'
import { User } from '../users/user.entity'
import { AdminGamesController } from './admin-games.controller'
import { AlternativeName } from './entity/alternative-name.entity'
import { Collection } from './entity/collection.entity'
import { ColorPalette } from './entity/color-palette.entity'
import { Cover } from './entity/cover.entity'
import { GameAlbum } from './entity/game-album.entity'
import { GameToMusic } from './entity/game-to-music.entity'
import { Game } from './entity/game.entity'
import { Genre } from './entity/genre.entity'
import { IgdbClient } from './entity/igdb.entity'
import { MusicAccuracy } from './entity/music-accuracy.entity'
import { Music } from './entity/music.entity'
import { Platform } from './entity/platform.entity'
import { Screenshot } from './entity/screenshot.entity'
import { Theme } from './entity/theme.entity'
import { Video } from './entity/video.entity'
import { GameAlbumController } from './game-album.controller'
import { GameToMusicController } from './game-to-music.controller'
import { GameProcessor } from './game.processor'
import { WebhookController } from './games-webhook.controller'
import { GamesController } from './games.controller'
import { IgdbHttpService } from './http/igdb.http.service'
import { IgdbWebhookProcessor } from './igdb-webhook.processor'
import { GameToMusicsService } from './services/game-to-musics.service'
import { GamesService } from './services/games.service'
import { IgdbService } from './services/igdb.service'
import { AlternativeNameSubscriber } from './subscribers/alternative-name.subscriber'
import { CollectionSubscriber } from './subscribers/collection.subscriber'
import { GameAlbumcSubscriber } from './subscribers/game-album.subscriber'
import { GameToMusicSubscriber } from './subscribers/game-to-music.subscriber'
import { GameSubscriber } from './subscribers/game.subscriber'
import { MusicAccuracySubscriber } from './subscribers/music-accuracy.subscriber'
import { GameType } from './entity/game-type.entity'

@Module({
    controllers: [
        AdminGamesController,
        GamesController,
        GameToMusicController,
        WebhookController,
        GameAlbumController,
    ],
    imports: [
        TypeOrmModule.forFeature([
            Game,
            AlternativeName,
            Cover,
            IgdbClient,
            GameAlbum,
            GameToMusic,
            GameType,
            Music,
            File,
            User,
            ColorPalette,
            MusicAccuracy,
            Platform,
            Video,
            Screenshot,
            Genre,
            Theme,
            Collection,
        ]),
        HttpModule,
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                node: configService.get('ELASTICSEARCH_NODE'),
                auth: {
                    username: configService.get('ELASTICSEARCH_USERNAME')!,
                    password: configService.get('ELASTICSEARCH_PASSWORD')!,
                },
                ...(configService.get('ELASTICSEARCH_CA_PATH') && {
                    tls: {
                        ca: configService.get('ELASTICSEARCH_CA_PATH'),
                        rejectUnauthorized: false,
                    },
                }),
                requestTimeout: 300000,
                pingTimeout: 300000,
                maxRetries: 5,
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: 'igdbWebhook',
        }),
        BullModule.registerQueue({
            name: 'game',
        }),
    ],
    providers: [
        GamesService,
        IgdbService,
        IgdbHttpService,
        GameToMusicSubscriber,
        GameSubscriber,
        AlternativeNameSubscriber,
        MusicAccuracySubscriber,
        IgdbWebhookProcessor,
        GameProcessor,
        CollectionSubscriber,
        DiscordService,
        DiscordHttpService,
        GameAlbumcSubscriber,
        GameToMusicsService,
    ],
})
export class GamesModule {}
