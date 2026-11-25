import { Processor, WorkerHost } from '@nestjs/bullmq'
import { InjectRepository } from '@nestjs/typeorm'
import { Job } from 'bullmq'
import { Repository } from 'typeorm'

import { Game } from './entity/game.entity'
import { IgdbHttpService } from './http/igdb.http.service'
import { IgdbGame } from './igdb.type'
import { IgdbService } from './services/igdb.service'
import { Logger } from '@nestjs/common'

@Processor('igdbWebhook')
export class IgdbWebhookProcessor extends WorkerHost {
    constructor(
        private igdbService: IgdbService,
        @InjectRepository(Game) private gamesRepository: Repository<Game>,
        private igdbHttpService: IgdbHttpService,
    ) {
        super()
    }
    private readonly logger = new Logger(IgdbWebhookProcessor.name)

    async process(job: Job<IgdbGame>): Promise<void> {
        switch (job.name) {
            case 'gameUpdate':
                return this.gameUpdate(job)
            case 'gameRemove':
                return this.gameRemove(job)
            default:
                this.logger.warn(`Unknown igdbWebhook job: ${job.name}`)
        }
    }

    async gameUpdate(job: Job<IgdbGame>): Promise<void> {
        try {
            this.logger.debug(`WEBHOOK: update game ${job.id}`)
            const game = await this.gamesRepository.findOne({
                where: {
                    igdbId: job.data.id,
                    enabled: true,
                },
            })
            if (game !== null) {
                const [igdbGame] = await this.igdbHttpService.getDataFromUrl(job.data.url)

                if (!igdbGame) return
                await this.igdbService.import(igdbGame)
            }
        } catch (error) {
            this.logger.error(`WEBHOOK: An error occurred while updating game ${job.id}`, error)
        }
    }

    async gameRemove(job: Job<IgdbGame>): Promise<void> {
        try {
            this.logger.debug(`WEBHOOK: remove game ${job.id}`)
            // get a game without music, so we don't delete a game with musics
            const game = await this.gamesRepository
                .createQueryBuilder('game')
                .leftJoin('game.musics', 'music')
                .andWhere('music.id IS NULL')
                .andWhere('game.igdbId = :igdbId', { igdbId: job.data.id })
                .getOne()

            if (game === null) {
                return
            }
            await this.gamesRepository.remove(game)
            return
        } catch (error) {
            this.logger.error(`WEBHOOK: An error occurred while deleting game ${job.id}`, error)
        }
    }
}
