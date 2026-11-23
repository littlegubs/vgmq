import { Process, Processor } from '@nestjs/bull'
import { InjectRepository } from '@nestjs/typeorm'
import { Job } from 'bull'
import { Repository } from 'typeorm'

import { Game } from './entity/game.entity'
import { IgdbHttpService } from './http/igdb.http.service'

@Processor('game')
export class GameProcessor {
    constructor(
        @InjectRepository(Game) private gamesRepository: Repository<Game>,
        private igdbHttpService: IgdbHttpService,
    ) {}

    @Process('getSimilarGames')
    async getSimilarGames(job: Job<number>): Promise<void> {
        const game = await this.gamesRepository.findOne({
            relations: {
                musics: true,
            },
            where: {
                id: job.data,
            },
        })
        if (game !== null && game.musics.length > 0) {
            const [igdbGame] = await this.igdbHttpService.getDataFromUrl(game.url)

            if (!igdbGame) return
            let similarGames: Game[] = []
            if (igdbGame.similar_games) {
                for (const igdbSimilarGame of igdbGame.similar_games) {
                    const similarGame = await this.gamesRepository.findOne({
                        where: { igdbId: igdbSimilarGame.id },
                    })
                    if (similarGame) similarGames = [...similarGames, similarGame]
                }
            }
            await this.gamesRepository.save({ ...game, similarGames })
        }
    }
}
