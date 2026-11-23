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

                const client = await createClient({
                    url: `redis://:${configService.get<string>('REDIS_PASSWORD')}@${configService.get<string>('REDIS_HOST')}:${configService.get<string>('REDIS_PORT')}/1`,
                })
                    .on('error', (err) => {
                        logger.error(err, 'Redis error')
                    })
                    .connect()
                logger.log('Redis Connected')

                return client
            },
        },
    ],
    exports: ['RedisClient'],
})
export class RedisModule {}
