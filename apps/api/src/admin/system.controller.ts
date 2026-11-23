import { InjectQueue } from '@nestjs/bull'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Job, Queue } from 'bull'
import { In, Repository } from 'typeorm'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { LobbyMusic } from '../lobbies/entities/lobby-music.entity'
import { LobbyUser } from '../lobbies/entities/lobby-user.entity'
import { Lobby, LobbyStatuses } from '../lobbies/entities/lobby.entity'
import { Role } from '../users/role.enum'
import { Roles } from '../users/roles.decorator'
import { RolesGuard } from '../users/roles.guard'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/system')
export class SystemController {
    constructor(
        @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
        @InjectRepository(LobbyMusic) private lobbyMusicRepository: Repository<LobbyMusic>,
        @InjectRepository(LobbyUser) private lobbyUserRepository: Repository<LobbyUser>,
        @InjectQueue('lobby') private lobbyQueue: Queue,
    ) {}

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('listJobs')
    async getJobs(): Promise<Job[]> {
        return this.lobbyQueue.getJobs([
            'completed',
            'waiting',
            'active',
            'delayed',
            'failed',
            'paused',
        ])
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('resetPublicLobbies')
    async resetPublicLobbies(): Promise<void> {
        const lobbies = await this.lobbyRepository.find({
            relations: { lobbyMusics: true, lobbyUsers: true },
            where: { custom: false },
        })
        for (const lobby of lobbies) {
            await this.lobbyRepository.save({
                ...lobby,
                status: LobbyStatuses.Waiting,
                currentLobbyMusicPosition: null,
            })
            await this.lobbyMusicRepository.remove(lobby.lobbyMusics)
            await this.lobbyUserRepository.remove(lobby.lobbyUsers)
        }
    }

    @Roles(Role.SuperAdmin)
    @Get('resetPrivateLobbies')
    async resetPrivateLobbies(): Promise<void> {
        const lobbies = await this.lobbyRepository.find({
            relations: { lobbyMusics: true, lobbyUsers: true },
            where: { custom: true, status: In([LobbyStatuses.Waiting, LobbyStatuses.Result]) },
        })

        if (lobbies.length > 0) {
            for (const lobby of lobbies) {
                await Promise.all([
                    this.lobbyMusicRepository.remove(lobby.lobbyMusics),
                    this.lobbyUserRepository.remove(lobby.lobbyUsers),
                ])
                await this.lobbyRepository.remove(lobby)
            }
        }
    }
}
