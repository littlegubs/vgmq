import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { DateTime } from 'luxon'
import { LessThan, Repository } from 'typeorm'

import { DiscordService } from '../../discord/discord.service'
import { GameToMusic } from '../entity/game-to-music.entity'

export class GameToMusicsService {
    constructor(
        @InjectRepository(GameToMusic) private gameToMusicRepository: Repository<GameToMusic>,
        private discordService: DiscordService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_6PM)
    async actuallyRemoveGameToMusics(): Promise<void> {
        const gameToMusics = await this.gameToMusicRepository.find({
            relations: { game: true },
            where: {
                deleted: true,
                updatedAt: LessThan(DateTime.now().minus({ days: 30 }).toJSDate()),
            },
        })
        for (const gameToMusic of gameToMusics) {
            try {
                await this.gameToMusicRepository.remove(gameToMusic)
                let content = `Permanently removed music after 30 days:\n`
                content += `- **title**: ${gameToMusic.title ?? gameToMusic.music.title}\n`
                content += `- **artist**: ${gameToMusic.artist ?? gameToMusic.music.artist}\n\n`
                content += 'This action cannot be undone.'
                void this.discordService.sendUpdateForGame({
                    game: gameToMusic.game,
                    content,
                    type: 'danger',
                })
            } catch (e) {
                console.error(`Failed to remove gameToMusic ${gameToMusic.id}, Error: ${e}`)
            }
        }
    }
}
