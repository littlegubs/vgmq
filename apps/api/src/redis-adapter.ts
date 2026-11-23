import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import { ServerOptions } from 'socket.io'

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>
    constructor(
        app: INestApplication,
        private readonly configService: ConfigService,
    ) {
        super(app)
    }

    async connectToRedis(): Promise<void> {
        const pubClient = createClient({
            url: `redis://:${this.configService.get('REDIS_PASSWORD')}@${this.configService.get(
                'REDIS_HOST',
            )}:${this.configService.get<number>('REDIS_PORT')}`,
        })
        const subClient = pubClient.duplicate()

        await Promise.all([pubClient.connect(), subClient.connect()])

        this.adapterConstructor = createAdapter(pubClient, subClient)
    }

    createIOServer(port: number, options?: ServerOptions): unknown {
        const server = super.createIOServer(port, options)
        return server.adapter(this.adapterConstructor)
    }
}
