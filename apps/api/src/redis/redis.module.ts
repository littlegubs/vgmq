import { Module, Global, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from 'redis'

@Global()
@Module({
    providers: [
        {
            provide: 'RedisClient',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const logger = new Logger('RedisModule')

                const client = createClient({
                    database: 1,
                    password: configService.get<string>('REDIS_PASSWORD') || undefined,
                    socket: {
                        host: configService.get<string>('REDIS_HOST', 'localhost'),
                        port: Number(configService.get<string>('REDIS_PORT', '6379')),
                    },
                })
                client.on('error', (err) => {
                    logger.error(err, 'Redis error')
                })
                await client.connect()
                logger.log('Redis Connected')

                return client
            },
        },
    ],
    exports: ['RedisClient'],
})
export class RedisModule {}
