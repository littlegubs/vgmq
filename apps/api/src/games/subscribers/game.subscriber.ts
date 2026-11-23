import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm'

import { AlternativeName } from '../entity/alternative-name.entity'
import { Game } from '../entity/game.entity'
import { GamesService } from '../services/games.service'

@EventSubscriber()
export class GameSubscriber implements EntitySubscriberInterface<Game> {
    constructor(
        connection: DataSource,
        private gameService: GamesService,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof Game {
        return Game
    }

    async afterInsert(event: InsertEvent<Game>): Promise<void> {
        if (event.entity.enabled) {
            await this.gameService.indexGameName(event.entity)
        }
    }

    async afterUpdate(event: UpdateEvent<Game>): Promise<void> {
        if (event.updatedColumns.some((column) => column.propertyName === 'enabled')) {
            if (event.entity?.enabled === false) {
                await this.gameService.removeGameName(event.entity as Game)
                const alternativeNames = await event.manager.find(AlternativeName, {
                    relations: ['game'],
                    where: {
                        game: {
                            id: event.entity.id,
                        },
                    },
                })
                for (const alternativeName of alternativeNames) {
                    await event.manager.save(AlternativeName, {
                        ...alternativeName,
                        enabled: false,
                    })
                }
            } else if (event.entity?.enabled === true) {
                await this.gameService.indexGameName(event.entity as Game)
            }
        }
        if (event.updatedColumns.some((column) => column.propertyName === 'name')) {
            await this.gameService.updateGameName(event.entity as Game)
        }
    }
    async afterRemove(event: RemoveEvent<Game>): Promise<void> {
        if (event.entity) {
            await this.gameService.removeGameName(event.entity)
        }
    }
}
