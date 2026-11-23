import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm'

import { Lobby } from '../entities/lobby.entity'
import { LobbyMessage } from '../entities/lobby-message.entity'
import { LobbyReport, ReportStatus } from '../entities/lobby-report.entity'
import { LobbyListGateway } from '../lobby-list.gateway'
import { LobbyStatService } from '../services/lobby-stat.service'

@EventSubscriber()
export class LobbySubscriber implements EntitySubscriberInterface<Lobby> {
    constructor(
        connection: DataSource,
        private lobbyListGateway: LobbyListGateway,
        private lobbyStatService: LobbyStatService,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof Lobby {
        return Lobby
    }

    async afterInsert(event: InsertEvent<Lobby>): Promise<void> {
        this.lobbyListGateway.sendLobbyList(
            await event.manager.find(Lobby, { relations: { lobbyUsers: true, lobbyMusics: true } }),
        )
    }

    async afterUpdate(event: UpdateEvent<Lobby>): Promise<void> {
        this.lobbyListGateway.sendLobbyList(
            await event.manager.find(Lobby, { relations: { lobbyUsers: true, lobbyMusics: true } }),
        )
    }

    async afterRemove(event: RemoveEvent<Lobby>): Promise<void> {
        if (event.entity) {
            await this.lobbyStatService.deleteLobbyStatsKeys(event.entity?.code)
            const hasPendingReport =
                (await event.manager.count(LobbyReport, {
                    where: { lobbyId: event.entity.id, status: ReportStatus.Pending },
                })) > 0
            if (!hasPendingReport) {
                await event.manager.delete(LobbyMessage, { lobbyId: event.entity.id })
            }
        }
        this.lobbyListGateway.sendLobbyList(
            await event.manager.find(Lobby, { relations: { lobbyUsers: true, lobbyMusics: true } }),
        )
    }
}
