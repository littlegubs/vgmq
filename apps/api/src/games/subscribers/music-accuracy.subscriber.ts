import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'

import { GameToMusic } from '../entity/game-to-music.entity'
import { MusicAccuracy } from '../entity/music-accuracy.entity'

@EventSubscriber()
export class MusicAccuracySubscriber implements EntitySubscriberInterface<MusicAccuracy> {
    constructor(connection: DataSource) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof MusicAccuracy {
        return MusicAccuracy
    }

    async afterInsert(event: InsertEvent<MusicAccuracy>): Promise<void> {
        const totalAnswers = await event.manager
            .createQueryBuilder(MusicAccuracy, 'musicAccuracy')
            .andWhere('musicAccuracy.gameToMusic = :gameToMusicId', {
                gameToMusicId: event.entity.gameToMusic.id,
            })
            .andWhere('NOT (musicAccuracy.playedTheGame = 0 AND musicAccuracy.correctAnswer = 0)')
            .getCount()

        // there must be at least 10 answers before saving the accuracy
        if (totalAnswers < 10) {
            return
        }
        const correctAnswers = await event.manager
            .createQueryBuilder(MusicAccuracy, 'musicAccuracy')
            .andWhere('musicAccuracy.gameToMusic = :gameToMusicId', {
                gameToMusicId: event.entity.gameToMusic.id,
            })
            .andWhere('musicAccuracy.correctAnswer = 1')
            .getCount()

        await event.manager.save(GameToMusic, {
            ...event.entity.gameToMusic,
            guessAccuracy:
                totalAnswers > 0
                    ? Math.round((correctAnswers / totalAnswers + Number.EPSILON) * 10000) / 10000
                    : null,
        })
    }
}
