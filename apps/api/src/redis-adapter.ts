import { INestApplication, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import { ServerOptions } from 'socket.io'

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>
    private readonly redisLogger = new Logger(RedisIoAdapter.name)
    constructor(
        app: INestApplication,
        private readonly configService: ConfigService,
    ) {
        super(app)
    }

    async connectToRedis(): Promise<void> {
        const pubClient = createClient({
            database: 0,
            password: this.configService.get<string>('REDIS_PASSWORD') || undefined,
            socket: {
                host: this.configService.get<string>('REDIS_HOST', 'localhost'),
                port: Number(this.configService.get<string>('REDIS_PORT', '6379')),
            },
        })
        const subClient = pubClient.duplicate()

        pubClient.on('error', (err) => {
            this.redisLogger.error(err, 'Redis adapter pub client error')
        })
        subClient.on('error', (err) => {
            this.redisLogger.error(err, 'Redis adapter sub client error')
        })

        await Promise.all([pubClient.connect(), subClient.connect()])

        this.adapterConstructor = createAdapter(pubClient, subClient)
    }

    createIOServer(port: number, options?: ServerOptions): unknown {
        const server = super.createIOServer(port, options)
        return server.adapter(this.adapterConstructor)
    }
}
