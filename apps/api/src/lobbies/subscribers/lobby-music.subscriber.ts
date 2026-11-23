import { DataSource, EntitySubscriberInterface, EventSubscriber, RemoveEvent } from 'typeorm'

import { LobbyMusic } from '../entities/lobby-music.entity'
import { Inject, Logger } from '@nestjs/common'
import { CLIPS_STORAGE } from '../../storage/storage.constants'
import { StorageService } from '../../storage/storage.interface'

@EventSubscriber()
export class LobbyMusicSubscriber implements EntitySubscriberInterface<LobbyMusic> {
    constructor(
        dataSource: DataSource,
        @Inject(CLIPS_STORAGE) private clipsStorageService: StorageService,
    ) {
        dataSource.subscribers.push(this)
    }
    private readonly logger = new Logger(LobbyMusicSubscriber.name)

    listenTo(): typeof LobbyMusic {
        return LobbyMusic
    }

    async beforeRemove(event: RemoveEvent<LobbyMusic>): Promise<void> {
        if (!event.entityId) {
            return
        }
        event.manager
            .findOne(LobbyMusic, {
                where: {
                    id: event.entityId,
                },
            })
            .then((lobbyMusic) => {
                if (lobbyMusic === null || !lobbyMusic.clipPath) {
                    return
                }
                this.clipsStorageService.deleteObject(lobbyMusic.clipPath).catch((err) => {
                    if (err.code !== 404) {
                        throw err
                    }
                })
            })
    }
}
