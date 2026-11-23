import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { GamesModule } from './games/games.module'
import { GamesService } from './games/services/games.service'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule)

    const gameService = app.select(GamesModule).get(GamesService, { strict: true })

    try {
        await gameService.generateAlbums()
    } catch (error) {
        console.error(error)
    }
    await app.close()
}

void bootstrap()
