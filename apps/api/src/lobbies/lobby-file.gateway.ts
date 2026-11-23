import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import {
    ConnectedSocket,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface'
import { Server } from 'socket.io'
import { Repository } from 'typeorm'

import { UsersService } from '../users/users.service'
import { LobbyUser } from './entities/lobby-user.entity'
import { AuthenticatedSocket, WSAuthMiddleware } from './socket-middleware'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: '/file',
})
export class LobbyFileGateway implements NestGateway {
    @WebSocketServer()
    server: Server

    constructor(
        @InjectRepository(LobbyUser)
        private lobbyUserRepository: Repository<LobbyUser>,
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    sendBuffer(lobbyCode: string, buffer: Buffer): void {
        this.server.to(lobbyCode).emit('buffer', buffer)
    }

    afterInit(): void {
        const middle = WSAuthMiddleware(this.jwtService, this.userService, this.lobbyUserRepository)
        this.server.use(middle)
    }

    @SubscribeMessage('join')
    async join(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        if (client.user) {
            const lobbyUser = await this.lobbyUserRepository.findOne({
                relations: { lobby: true, user: true },
                where: { user: { id: client.user.id } },
            })
            if (lobbyUser) {
                void client.join(lobbyUser.lobby.code)
            }
        }
    }
}
