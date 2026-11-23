import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'
import { Repository } from 'typeorm'

import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { LobbyUser } from './entities/lobby-user.entity'

export class AuthenticatedSocket extends Socket {
    user: User
}

export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void
export const WSAuthMiddleware = (
    jwtService: JwtService,
    userService: UsersService,
    lobbyUserRepository: Repository<LobbyUser>,
): SocketMiddleware => {
    return async (socket: AuthenticatedSocket, next): Promise<void> => {
        try {
            const jwtPayload: {
                username: string
            } = jwtService.verify(socket.handshake.auth.token ?? '')
            const user = await userService.findByUsername(jwtPayload.username)

            if (user !== null) {
                const lobbyUser = await lobbyUserRepository.findOne({
                    relations: {
                        user: { patreonAccount: true },
                    },
                    where: {
                        user: {
                            id: user.id,
                        },
                    },
                })
                if (lobbyUser !== null) {
                    await lobbyUserRepository.save({ ...lobbyUser, toDisconnect: false })
                }
                socket.user = user
                next()
            } else {
                next(new UnauthorizedException())
            }
        } catch (error) {
            next(new UnauthorizedException())
        }
    }
}
