import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi'
import { LoggerModule } from 'nestjs-pino'
import { DataSource } from 'typeorm'

import { AdminModule } from './admin/admin.module'
import { AlternativeNamesModule } from './alternative-names/alternative-names.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { DiscordModule } from './discord/discord.module'
import { GamesModule } from './games/games.module'
import { LobbyModule } from './lobbies/lobby.module'
import { MailModule } from './mail/mail.module'
import { MusicsModule } from './musics/musics.module'
import { OauthModule } from './oauth/oauth.module'
import { RedisModule } from './redis/redis.module'
import { FileSubscriber } from './subscribers/file.subscriber'
import { UsersModule } from './users/users.module'
import { StorageModule } from './storage/storage.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import * as process from 'node:process'
import { dataSourceOptions } from '../ormconfig'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                ENV: Joi.string().valid('dev', 'prod').default('dev'),
            }),
            envFilePath: ['.env.local', '.env'],
        }),
        LoggerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                pinoHttp: {
                    customProps: (): { context: string } => ({
                        context: 'HTTP',
                    }),
                    level: configService.get<string>('LOG_LEVEL', 'info'),
                    base: undefined,
                    transport:
                        configService.get<string>('LOG_PRETTY') == 'true'
                            ? {
                                  target: 'pino-pretty',
                                  options: {
                                      colorize: true,
                                      singleLine: true,
                                  },
                              }
                            : undefined,
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
        BullModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                redis: {
                    db: 0,
                    host: configService.get('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                    password: configService.get('REDIS_PASSWORD'),
                    retryStrategy: (times: number): number => {
                        return Math.max(Math.min(Math.exp(times), 20000), 1000)
                    },
                },
                defaultJobOptions: {
                    removeOnComplete: true,
                    removeOnFail: true,
                },
            }),
            inject: [ConfigService],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'upload/public'),
            serveRoot: '/public',
        }),
        ScheduleModule.forRoot(),
        StorageModule,
        UsersModule,
        AuthModule,
        GamesModule,
        AlternativeNamesModule,
        MusicsModule,
        LobbyModule,
        MailModule,
        AdminModule,
        OauthModule.register(),
        DiscordModule,
        RedisModule,
    ],
    controllers: [AppController],
    providers: [AppService, FileSubscriber],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
