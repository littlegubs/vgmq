import 'reflect-metadata'

import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'

import { AppModule } from './app.module'
import { exceptionPipe } from './exception.pipe'
import { RedisIoAdapter } from './redis-adapter'
import compression from 'compression'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, { bufferLogs: true })

    const configService = app.get(ConfigService)
    const redisIoAdapter = new RedisIoAdapter(app, configService)
    await redisIoAdapter.connectToRedis()
    app.useWebSocketAdapter(redisIoAdapter)

    app.useGlobalPipes(exceptionPipe)
    useContainer(app.select(AppModule), { fallbackOnErrors: true })
    app.useLogger(app.get(Logger))
    app.useGlobalInterceptors(new LoggerErrorInterceptor())
    app.use(compression())

    const cors = configService.get<string>('CORS_ALLOW_ORIGIN')
    if (cors === undefined) {
        throw new Error('CORS_ALLOW_ORIGIN not defined')
    }
    app.enableCors({
        origin: new RegExp(cors),
        credentials: true,
        maxAge: 3000,
    })

    const port = configService.get<number>('PORT')
    if (port === undefined) {
        throw new Error('PORT not defined')
    }

    await app.listen(port)
}

void bootstrap()
