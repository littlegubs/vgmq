import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'

import { LobbyUser } from '../entities/lobby-user.entity'
import { Lobby } from '../entities/lobby.entity'
import { LobbyGateway } from '../lobby.gateway'

@EventSubscriber()
export class LobbyUserSubscriber implements EntitySubscriberInterface<LobbyUser> {
    constructor(
        connection: DataSource,
        private lobbyGateway: LobbyGateway,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof LobbyUser {
        return LobbyUser
    }

    async beforeInsert(event: InsertEvent<LobbyUser>): Promise<void> {
        if (event.entity.user.premium) {
            const lobby = await event.manager.findOne(Lobby, {
                where: { id: event.entity.lobby.id },
            })
            if (lobby !== null && !lobby.premium) {
                await event.manager.update(Lobby, lobby.id, { premium: true })
                await this.lobbyGateway.sendUpdateToRoom(lobby.code)
                this.lobbyGateway.emitChat(
                    lobby.code,
                    null,
                    `Lobby premium features unlocked by ${event.entity.user.username}`,
                )
            }
        }
    }
}
