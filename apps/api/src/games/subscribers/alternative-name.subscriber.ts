import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm'

import { AlternativeName } from '../entity/alternative-name.entity'
import { GamesService } from '../services/games.service'

@EventSubscriber()
export class AlternativeNameSubscriber implements EntitySubscriberInterface<AlternativeName> {
    constructor(
        private connection: DataSource,
        private gameService: GamesService,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof AlternativeName {
        return AlternativeName
    }

    async afterInsert(event: InsertEvent<AlternativeName>): Promise<void> {
        if (event.entity.enabled) {
            await this.gameService.indexAlternativeName(event.entity)
        }
    }

    async afterUpdate(event: UpdateEvent<AlternativeName>): Promise<void> {
        if (event.updatedColumns.some((column) => column.propertyName === 'enabled')) {
            if (event.entity?.enabled === false) {
                await this.gameService.removeAlternativeName(event.entity as AlternativeName)
            } else if (event.entity?.enabled === true) {
                await this.gameService.indexAlternativeName(event.entity as AlternativeName)
            }
        }
        if (event.updatedColumns.some((column) => column.propertyName === 'name')) {
            await this.gameService.updateAlternativeName(event.entity as AlternativeName)
        }
    }
    async beforeRemove(event: RemoveEvent<AlternativeName>): Promise<void> {
        if (!event.entityId) {
            return
        }
        const alternativeName = await event.manager.findOneBy(AlternativeName, {
            id: event.entityId,
        })
        if (alternativeName === null) {
            return
        }
        await this.gameService.removeAlternativeName(alternativeName)
    }
}
