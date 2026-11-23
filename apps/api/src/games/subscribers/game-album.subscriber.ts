import { ConfigService } from '@nestjs/config'
import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm'

import { DiscordService } from '../../discord/discord.service'
import { GameAlbum } from '../entity/game-album.entity'
import { Game } from '../entity/game.entity'
import { File } from '../../entity/file.entity'

@EventSubscriber()
export class GameAlbumcSubscriber implements EntitySubscriberInterface<GameAlbum> {
    constructor(
        connection: DataSource,
        private discordService: DiscordService,
        private configService: ConfigService,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof GameAlbum {
        return GameAlbum
    }

    afterInsert(event: InsertEvent<GameAlbum>): void {
        try {
            const game = event.entity?.game
            if (game !== undefined) {
                const content = `new album created: **${event.entity.name}**`

                void this.discordService.sendUpdateForGame({
                    game: game,
                    content: content,
                    user: event.entity?.createdBy,
                    type: 'success',
                    // TODO fix this, this used to work, something to do with ContentType/Disposition or something
                    // ...(event.entity.cover?.path && {
                    //     thumbnail: `${this.configService.get('CDN_URL')}${
                    //         event.entity.cover?.path
                    //     }`,
                    // }),
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    afterUpdate(event: UpdateEvent<GameAlbum>): void {
        try {
            const updatedName = event.updatedColumns.find(
                (column) => column.propertyName === 'name',
            )
            const updatedCover = event.updatedRelations.find(
                (relation) => relation.propertyName === 'cover',
            )
            if (updatedName || updatedCover) {
                const game = event.entity?.game as Game
                if (game !== undefined) {
                    let content = `Updated album: \n`

                    const oldName = event.databaseEntity.name
                    content += `- **name**: ${
                        updatedName && oldName !== event.entity?.name ? `${oldName} **→** ` : ''
                    }${event.entity?.name}\n`

                    void this.discordService.sendUpdateForGame({
                        game,
                        content,
                        user: event.entity?.updatedBy,
                        // TODO fix this, this used to work, something to do with ContentType/Disposition or something
                        // ...(event.entity?.cover?.path && {
                        //     thumbnail: `${this.configService.get('CDN_URL')}${
                        //         event.entity.cover?.path
                        //     }`,
                        // }),
                    })
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    async afterRemove(event: RemoveEvent<GameAlbum>): Promise<void> {
        if (event.entity?.cover) {
            await event.manager.remove(File, event.entity.cover)
        }
    }
}
