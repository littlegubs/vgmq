import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm'

import { DiscordService } from '../../discord/discord.service'
import { GameAlbum } from '../entity/game-album.entity'
import { GameToMusic, GameToMusicType } from '../entity/game-to-music.entity'
import { Game } from '../entity/game.entity'
import { Music } from '../entity/music.entity'

@EventSubscriber()
export class GameToMusicSubscriber implements EntitySubscriberInterface<GameToMusic> {
    constructor(
        connection: DataSource,
        private discordService: DiscordService,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof GameToMusic {
        return GameToMusic
    }

    async afterUpdate(event: UpdateEvent<GameToMusic>): Promise<void> {
        try {
            const updatedTitle = event.updatedColumns.find(
                (column) => column.propertyName === 'title',
            )
            const updatedArtist = event.updatedColumns.find(
                (column) => column.propertyName === 'artist',
            )
            const updatedAlbum = event.updatedRelations.find(
                (relation) => relation.propertyName === 'album',
            )
            // somehow, typeorm updatedRelations is not empty if album goes from null to null
            let albumDidUpdate = updatedAlbum !== undefined
            if (albumDidUpdate) {
                if (event.databaseEntity.album?.id === null && event.entity?.album === null) {
                    albumDidUpdate = false
                }
            }

            if (updatedTitle || updatedArtist || albumDidUpdate) {
                const game = event.entity?.game as Game
                if (game !== undefined) {
                    let content = `Updated music: \n`
                    const music = await event.manager.findOne(Music, {
                        where: {
                            id: event.databaseEntity.music.id,
                        },
                    })
                    const oldTitle = event.databaseEntity.title ?? music?.title
                    content += `- **title**: ${
                        updatedTitle && oldTitle !== event.entity?.title ? `${oldTitle} **→** ` : ''
                    }${event.entity?.title ?? music?.title}\n`
                    const oldArtist = event.databaseEntity.artist ?? music?.artist

                    content += `- **artist**: ${
                        updatedArtist && oldArtist !== event.entity?.artist
                            ? `${oldArtist} **→** `
                            : ''
                    }${event.entity?.artist ?? music?.artist}\n`

                    const oldAlbum = event.databaseEntity.album?.id
                        ? await event.manager.findOne(GameAlbum, {
                              where: {
                                  id: event.databaseEntity.album.id,
                              },
                          })
                        : null
                    const album =
                        event.entity?.album === undefined
                            ? undefined
                            : event.entity?.album === null
                              ? null
                              : await event.manager.findOne(GameAlbum, {
                                    where: {
                                        id: event.entity?.album.id,
                                    },
                                })

                    content += `- **album**: ${
                        album !== undefined && oldAlbum?.name !== album?.name
                            ? `${oldAlbum?.name} **→** `
                            : ''
                    } ${
                        oldAlbum?.name !== album?.name
                            ? album?.name
                            : (album?.name ?? oldAlbum?.name)
                    }`
                    void this.discordService.sendUpdateForGame({
                        game,
                        content,
                        user: event.entity?.updatedBy,
                    })
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    async beforeRemove(event: RemoveEvent<GameToMusic>): Promise<void> {
        const derivedGameToMusics = event.entity?.derivedGameToMusics
        if (derivedGameToMusics !== undefined && derivedGameToMusics.length > 0) {
            for (const gameToMusic of derivedGameToMusics) {
                await event.manager.save(GameToMusic, {
                    ...gameToMusic,
                    type: GameToMusicType.Original,
                    originalGameToMusic: null,
                })
            }
        }
    }

    async afterRemove(event: RemoveEvent<GameToMusic>): Promise<void> {
        if (event.entity?.music) {
            const countMusics = await event.manager.count(GameToMusic, {
                where: {
                    music: {
                        id: event.entity.music.id,
                    },
                },
            })
            if (countMusics === 0) {
                await event.manager.remove(Music, event.entity.music)
            }
        }
    }
}
