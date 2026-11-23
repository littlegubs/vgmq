import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy } from 'passport-jwt'
import { Socket } from 'socket.io'
import { Repository } from 'typeorm'

import { LobbyUser } from '../../lobbies/entities/lobby-user.entity'
import { User } from '../../users/user.entity'
import { UsersService } from '../../users/users.service'

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'ws') {
    constructor(
        private usersService: UsersService,
        @InjectRepository(LobbyUser)
        private lobbyUserRepository: Repository<LobbyUser>,
    ) {
        super({
            jwtFromRequest: (req: Socket): string | null => {
                const token = req.handshake.auth.token

                return typeof token === 'string' ? token : null
            },
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET!,
        })
    }

    async validate(payload: { username: string }): Promise<User | null> {
        const user = await this.usersService.findByUsername(payload.username)
        if (user !== null) {
            const lobbyUser = await this.lobbyUserRepository.findOne({
                relations: {
                    user: true,
                },
                where: {
                    user: {
                        id: user.id,
                    },
                },
            })
            if (lobbyUser !== null) {
                await this.lobbyUserRepository.save({ ...lobbyUser, toDisconnect: false })
            }
        }
        return user
    }
}
