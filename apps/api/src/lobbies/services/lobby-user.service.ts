import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, LessThan, Not, Repository } from 'typeorm'

import { User } from '../../users/user.entity'
import { LobbyUser, LobbyUserRole, LobbyUserStatus } from '../entities/lobby-user.entity'
import { Lobby } from '../entities/lobby.entity'
import dayjs from 'dayjs'
import { LobbyMusic } from '../entities/lobby-music.entity'
import { LobbyGateway } from '../lobby.gateway'

@Injectable()
export class LobbyUserService {
    constructor(
        @InjectRepository(LobbyUser) private lobbyUserRepository: Repository<LobbyUser>,
        @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
        @InjectRepository(LobbyMusic) private lobbyMusicRepository: Repository<LobbyMusic>,
        @Inject(forwardRef(() => LobbyGateway))
        private lobbyGateway: LobbyGateway,
    ) {}
    private readonly logger = new Logger(LobbyUserService.name)

    async areAllUsersReadyToPlay(lobby: Lobby): Promise<boolean> {
        const countOptions: FindManyOptions<LobbyUser> = {
            relations: {
                lobby: true,
            },
            where: {
                lobby: {
                    id: lobby.id,
                },
                disconnected: false,
                role: Not(LobbyUserRole.Spectator),
            },
        }
        const countLobbyUsersPlaying = await this.lobbyUserRepository.count(countOptions)
        const countLobbyUsersReady = await this.lobbyUserRepository.count({
            ...countOptions,
            where: { ...countOptions.where, status: LobbyUserStatus.ReadyToPlayMusic },
        })

        return countLobbyUsersReady === countLobbyUsersPlaying
    }

    getLobbyUserByUsername(username: string, lobby?: Lobby): Promise<LobbyUser | null> {
        return this.lobbyUserRepository.findOne({
            relations: {
                user: true,
                lobby: { lobbyUsers: true },
            },
            where: {
                user: {
                    username: username,
                },
                ...(lobby && {
                    lobby: {
                        id: lobby.id,
                    },
                }),
            },
        })
    }

    getLobbyHostByUser(user: User): Promise<LobbyUser | null> {
        return this.lobbyUserRepository.findOne({
            relations: {
                user: true,
                lobby: true,
            },
            where: {
                user: {
                    id: user.id,
                },
                role: LobbyUserRole.Host,
            },
        })
    }

    @Cron(CronExpression.EVERY_HOUR)
    async checkIfUserIsAFK(): Promise<void> {
        const lobbyUsers = await this.lobbyUserRepository.find({
            relations: { lobby: true },
            where: {
                lastAnswerAt: LessThan(dayjs().subtract(90, 'minute').toDate()),
            },
        })
        await this.lobbyUserRepository.remove(lobbyUsers)
        for (const lobbyUser of lobbyUsers) {
            await this.handlePlayerDisconnected(lobbyUser)
        }
    }

    async handlePlayerDisconnected(lobbyUser: LobbyUser) {
        const lobbyUsers = await this.lobbyUserRepository.find({
            relations: { user: { patreonAccount: true }, lobby: true },
            where: {
                lobby: {
                    id: lobbyUser.lobby.id,
                },
            },
        })
        const lobby = await this.lobbyRepository.findOne({
            relations: { lobbyMusics: true },
            where: {
                id: lobbyUser.lobby.id,
            },
        })
        if (!lobby) {
            this.logger.warn(`Lobby not found for disconnecting lobbyUser ${lobbyUser.id}`)
            return
        }
        if (
            lobby?.premium &&
            !lobbyUsers.some((lobbyUser) => {
                return lobbyUser.user.premium
            })
        ) {
            lobby.premium = false
            await this.lobbyRepository.save(lobby)
            await this.lobbyGateway.sendUpdateToRoom(lobby.code)
            this.lobbyGateway.emitChat(lobby.code, null, `Lobby is no longer premium!`)
        }

        if (lobbyUser.role === LobbyUserRole.Host) {
            const randomPlayer = await this.lobbyUserRepository
                .createQueryBuilder('lobbyUser')
                .andWhere('lobbyUser.lobby = :lobby')
                .andWhere('lobbyUser.role = :role')
                .andWhere('lobbyUser.disconnected = 0')
                .setParameter('lobby', lobby.id)
                .setParameter('role', LobbyUserRole.Player)
                .orderBy('RAND()')
                .getOne()
            if (randomPlayer) {
                await this.lobbyUserRepository.save({
                    ...randomPlayer,
                    role: LobbyUserRole.Host,
                })
            } else {
                await this.lobbyMusicRepository.remove(lobby!.lobbyMusics)
                await this.lobbyRepository.remove(lobby!)
                this.lobbyGateway.sendLobbyClosed(lobby!)
            }
        }
        await this.lobbyGateway.sendLobbyUsers(lobby!)
    }
}
