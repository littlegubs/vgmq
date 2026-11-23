import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
} from 'typeorm'

import { Collection } from '../entity/collection.entity'
import { GamesService } from '../services/games.service'

@EventSubscriber()
export class CollectionSubscriber implements EntitySubscriberInterface<Collection> {
    constructor(
        connection: DataSource,
        private gameService: GamesService,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof Collection {
        return Collection
    }

    async afterInsert(event: InsertEvent<Collection>): Promise<void> {
        await this.gameService.indexCollectionName(event.entity)
    }

    async beforeRemove(event: RemoveEvent<Collection>): Promise<void> {
        if (event.entity) {
            await this.gameService.removeCollectionName(event.entity)
        }
    }
}
