import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { GamesModule } from './games/games.module'
import { IgdbHttpService } from './games/http/igdb.http.service'
import * as process from 'node:process'
import { IgdbService } from './games/services/igdb.service'

async function bootstrap(): Promise<void> {
    console.log(process.env.TWITCH_CLIENT_ID)
    if (!process.env.TWITCH_CLIENT_ID && !process.env.TWITCH_CLIENT_SECRET) {
        console.warn(
            `Missing TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET environment variable, canceling seeding games`,
        )
        return
    }
    const app = await NestFactory.createApplicationContext(AppModule)

    const igdbService = app.select(GamesModule).get(IgdbService, { strict: true })
    const igdbHttpService = app.select(GamesModule).get(IgdbHttpService, { strict: true })
    const gamesUrls = [
        'https://www.igdb.com/games/minecraft-java-edition',
        'https://www.igdb.com/games/undertale',
        'https://www.igdb.com/games/wii-sports',
        'https://www.igdb.com/games/super-smash-bros-ultimate',
        'https://www.igdb.com/games/among-us',
        'https://www.igdb.com/games/mario-kart-wii',
        'https://www.igdb.com/games/terraria',
        'https://www.igdb.com/games/super-mario-64',
        'https://www.igdb.com/games/super-mario-galaxy',
        'https://www.igdb.com/games/portal-2',
        'https://www.igdb.com/games/elden-ring',
        'https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild',
    ]

    for (const url of gamesUrls) {
        try {
            const [igdbGame] = await igdbHttpService.getDataFromUrl(url)

            if (!igdbGame) throw new Error(`No game found for ${url}`)
            await igdbService.import(igdbGame)
            console.log(`successfully imported ${igdbGame.name}`)
        } catch (error) {
            console.error(error)
        }
    }
    await app.close()
    process.exit(0)
}

void bootstrap()
