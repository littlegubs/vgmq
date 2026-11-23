import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { GamesModule } from './games/games.module'
import { GamesService } from './games/services/games.service'
import process from 'node:process'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule)

    const gameService = app.select(GamesModule).get(GamesService, { strict: true })

    try {
        await gameService.populateElasticSearch()
    } catch (error) {
        console.error(error)
    }
    await app.close()
    process.exit(0)
}

void bootstrap()
