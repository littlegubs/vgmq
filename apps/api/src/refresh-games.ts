import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import { DataSource, MoreThan } from 'typeorm'

import { AppModule } from './app.module'
import { Game } from './games/entity/game.entity'
import { GamesModule } from './games/games.module'
import { IgdbHttpService } from './games/http/igdb.http.service'
import { IgdbService } from './games/services/igdb.service'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule)

    const dataSource = app.get(DataSource) // Retrieve the DataSource
    const gameRepository = dataSource.getRepository(Game)
    const igdbService = app.select(GamesModule).get(IgdbService, { strict: true })
    const igdbHttpService = app.select(GamesModule).get(IgdbHttpService, { strict: true })

    const games = await gameRepository.find({
        relations: { collections: true, genres: true, themes: true },
        where: { enabled: true, id: MoreThan(17794) },
    })
    let i = 1
    for (const game of games) {
        try {
            const [igdbData] = await igdbHttpService.getDataFromUrl(game.url)
            if (igdbData === undefined) {
                throw new Error(`Unable to get data from url ${game.url}`)
            }
            await igdbService.import(igdbData, undefined, { keepEnableAsIs: true })
            console.log(`${i}/${games.length} reimported ${game.name}`)
            i++
        } catch (error) {
            console.error(error)
        }
    }

    await app.close()
}

void bootstrap()
