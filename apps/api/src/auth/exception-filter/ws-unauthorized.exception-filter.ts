import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseWsExceptionFilter } from '@nestjs/websockets'
import { Repository } from 'typeorm'

import { LobbyUser } from '../../lobbies/entities/lobby-user.entity'
import { AuthenticatedSocket } from '../../lobbies/socket-middleware'

@Catch(UnauthorizedException)
export class WsUnauthorizedExceptionFilter extends BaseWsExceptionFilter {
    constructor(
        @InjectRepository(LobbyUser)
        private lobbyUserRepository: Repository<LobbyUser>,
    ) {
        super()
    }

    async catch(exception: UnauthorizedException, host: ArgumentsHost): Promise<void> {
        super.catch(exception, host)

        const [socket] = host.getArgs<[AuthenticatedSocket]>()
        if (socket.user !== undefined) {
            const lobbyUser = await this.lobbyUserRepository.findOne({
                relations: ['user'],
                where: {
                    user: {
                        id: socket.user.id,
                    },
                },
            })
            if (lobbyUser !== null) {
                await this.lobbyUserRepository.save({
                    ...lobbyUser,
                    isReconnecting: true,
                })
            }
        }

        socket.emit(exception.name, {
            status: 'error',
            message: exception.message,
        })
    }
}
