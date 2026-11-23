import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosResponse } from 'axios'
import { firstValueFrom } from 'rxjs'

import { Game } from '../games/entity/game.entity'
import { User } from '../users/user.entity'
import { DiscordHttpService } from './discord.http.service'

type DiscordMessageType = 'default' | 'success' | 'danger'

@Injectable()
export class DiscordService {
    constructor(
        private discordHttpService: DiscordHttpService,
        private configService: ConfigService,
    ) {}
    public async sendUpdateForGame(options: {
        game: Game
        content: string
        user?: User
        thumbnail?: string
        image?: string
        type?: DiscordMessageType
        color?: number
    }): Promise<AxiosResponse<any> | null> {
        return firstValueFrom(
            this.discordHttpService.sendMessage({
                embeds: [
                    {
                        title: options.game.name,
                        description: options.content,
                        color: options.color ?? this.getMessageColor(options.type),
                        footer: {
                            text: `updated by ${
                                options.user
                                    ? `${options.user.username} (#${options.user.id})`
                                    : 'VGMQ'
                            }`,
                        },
                        url: `${this.configService.get('VGMQ_CLIENT_URL')}/admin/games/${
                            options.game.slug
                        }`,
                        ...(options.image && { image: { url: options.image } }),
                        ...(options.thumbnail && { thumbnail: { url: options.thumbnail } }),
                    },
                ],
            }),
        )
    }

    private getMessageColor(type?: DiscordMessageType): number {
        switch (type) {
            case 'success':
                return 2616099
            case 'danger':
                return 15409955
            default:
                return 2329579
        }
    }
}
