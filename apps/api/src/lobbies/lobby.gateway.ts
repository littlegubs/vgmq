import { InjectQueue } from '@nestjs/bull'
import {
    forwardRef,
    Inject,
    Logger,
    NotFoundException,
    UnauthorizedException,
    UseFilters,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface'
import { Queue } from 'bull'
import { instanceToInstance } from 'class-transformer'
import dayjs from 'dayjs'
import { Server } from 'socket.io'
import { Brackets, DataSource, Not, Repository } from 'typeorm'

import { WsNotFoundExceptionFilter } from '../auth/exception-filter/ws-not-found.exception-filter'
import { WsUnauthorizedExceptionFilter } from '../auth/exception-filter/ws-unauthorized.exception-filter'
import { UsersService } from '../users/users.service'
import { shuffle } from '../utils/utils'
import { LobbyMusic } from './entities/lobby-music.entity'
import { LobbyUser, LobbyUserRole, LobbyUserStatus } from './entities/lobby-user.entity'
import { Lobby, LobbyHintMode, LobbyStatuses } from './entities/lobby.entity'
import { InvalidPasswordException } from './exceptions/invalid-password.exception'
import { MissingPasswordException } from './exceptions/missing-password.exception'
import { LobbyMusicLoaderService } from './services/lobby-music-loader.service'
import { LobbyUserService } from './services/lobby-user.service'
import { AuthenticatedSocket, WSAuthMiddleware } from './socket-middleware'
import { LobbyStatService } from './services/lobby-stat.service'
import { OauthPatreon } from '../oauth/entities/oauth-patreon.entity'
import { GameToMusic } from '../games/entity/game-to-music.entity'
import { LobbyMessage } from './entities/lobby-message.entity'

export function getHintModeGameNames(lobbyMusic: LobbyMusic): string[] {
    return shuffle(lobbyMusic.hintModeGames.map((game) => game.name))
}

@UseFilters(WsUnauthorizedExceptionFilter, WsNotFoundExceptionFilter)
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class LobbyGateway implements NestGateway, OnGatewayConnection {
    @WebSocketServer()
    server: Server

    constructor(
        @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
        @InjectRepository(LobbyMusic) private lobbyMusicRepository: Repository<LobbyMusic>,
        @InjectRepository(LobbyUser) private lobbyUserRepository: Repository<LobbyUser>,
        @InjectRepository(LobbyMessage) private lobbyMessageRepository: Repository<LobbyMessage>,
        @InjectQueue('lobby') private lobbyQueue: Queue,
        @Inject(forwardRef(() => LobbyMusicLoaderService))
        private lobbyMusicLoaderService: LobbyMusicLoaderService,
        @Inject(forwardRef(() => LobbyUserService))
        private lobbyUserService: LobbyUserService,
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private lobbyStatService: LobbyStatService,
        @InjectRepository(OauthPatreon) private oAuthPatreonRepository: Repository<OauthPatreon>,
        @InjectRepository(GameToMusic) private gameToMusicRepository: Repository<GameToMusic>,
        private dataSource: DataSource,
    ) {}

    private readonly logger = new Logger(LobbyGateway.name)

    @SubscribeMessage('join')
    async join(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() body: { code: string; password: string | null },
    ): Promise<undefined> {
        let lobby = await this.lobbyRepository.findOne({
            relations: { lobbyUsers: { user: true }, bannedUsers: true },
            where: {
                code: body.code,
            },
        })
        if (lobby === null) {
            throw new NotFoundException()
        }
        if (lobby.bannedUsers?.some((user) => user.id === client.user.id)) {
            throw new UnauthorizedException('Banned')
        }
        let lobbyUser = await this.lobbyUserRepository.findOne({
            relations: {
                user: { patreonAccount: true },
                lobby: true,
            },
            where: {
                user: {
                    id: client.user.id,
                },
            },
        })

        // if user was not connected or connected in another lobby, create a lobby user
        if (lobbyUser === null || lobbyUser.lobby.id !== lobby.id) {
            if (lobby.hasPassword) {
                if (body.password === null) {
                    throw new MissingPasswordException()
                }
                if (body.password !== lobby.password) {
                    throw new InvalidPasswordException()
                }
            }
            if (lobbyUser) {
                // remove user from previous lobby
                await this.lobbyUserRepository.remove(lobbyUser)
                await this.lobbyUserService.handlePlayerDisconnected(lobbyUser)
            }

            lobbyUser = this.lobbyUserRepository.create(
                await this.lobbyUserRepository.save({
                    lobby: lobby,
                    user: client.user,
                    role:
                        lobby.status === LobbyStatuses.Waiting || lobby.musicNumber === -1
                            ? LobbyUserRole.Player
                            : LobbyUserRole.Spectator,
                    lastAnswerAt: new Date(),
                }),
            )
        } else {
            // if user was previously in this lobby, set them connected
            if (lobbyUser.lobby.id === lobby.id) {
                await this.lobbyUserRepository.save({
                    ...lobbyUser,
                    disconnected: false,
                    isReconnecting: false,
                })
            }
        }
        // refresh lobby as it might be premium now
        lobby = (await this.lobbyRepository.findOne({
            relations: {
                collectionFilters: true,
                genreFilters: true,
                themeFilters: true,
                lobbyUsers: { user: true },
            },
            where: {
                code: body.code,
            },
        })) as Lobby
        await client.join(lobby.code)
        await client.join(`lobbyUser${lobbyUser.id}`)
        client.emit('lobbyJoined', instanceToInstance<Lobby>(lobby, { groups: ['lobby'] }))
        if (lobby.hintMode === LobbyHintMode.Always || lobbyUser.hintMode) {
            await this.showHintModeGames(lobbyUser, client, false)
        }
        if (
            [LobbyStatuses.PlayingMusic.toString(), LobbyStatuses.AnswerReveal.toString()].includes(
                lobby.status,
            )
        ) {
            const lobbyMusic = await this.lobbyMusicRepository.findOne({
                relations: {
                    lobby: true,
                    gameToMusic: {
                        game: {
                            cover: {
                                colorPalette: true,
                            },
                        },
                        music: true,
                    },
                    video: true,
                    screenshots: true,
                },
                where: {
                    lobby: { id: lobby.id },
                    position: lobby.currentLobbyMusicPosition!,
                },
            })
            if (lobbyMusic !== null) {
                if (lobby.status === LobbyStatuses.PlayingMusic) this.playMusic(lobbyMusic, client)
                if (lobby.status === LobbyStatuses.AnswerReveal) this.sendAnswer(lobbyMusic, client)
            }
        }
        if (!lobby.custom && lobby.musicNumber === -1 && lobby.status === LobbyStatuses.Waiting) {
            await this.lobbyRepository.save({ ...lobby, status: LobbyStatuses.Playing })
            await this.lobbyQueue.add('bufferMusic', lobbyUser.lobby.code, {
                timeout: 10_000,
            })
        }
        if (lobby.status === LobbyStatuses.Result) {
            await this.lobbyStatService.retrieveResultData(lobby)
            await this.sendLobbyUsers(lobby, lobby.lobbyUsers, client)
            await this.sendResultData(lobby)
        } else {
            await this.sendLobbyUsers(lobby, undefined, client)
        }
        this.server.to(lobby.code).emit(
            'lobbyUser',
            instanceToInstance<LobbyUser>(lobbyUser, {
                groups: ['wsLobby'],
                strategy: 'excludeAll',
            }),
        )

        return
    }

    @SubscribeMessage('play')
    async play(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() code: string,
    ): Promise<void> {
        let lobby = await this.lobbyRepository.findOneBy({
            code,
        })
        if (lobby === null) {
            throw new WsException('Not found')
        }
        lobby = this.lobbyRepository.create({ ...lobby, status: LobbyStatuses.Loading })
        await this.lobbyRepository.save(lobby)
        await this.sendUpdateToRoom(lobby.code)
        await this.lobbyMusicLoaderService.loadMusics(lobby)
    }

    @SubscribeMessage('chat')
    async chat(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() message: string,
    ): Promise<void> {
        const lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(client.user.username)
        if (lobbyUser === null) {
            throw new WsException('Not found')
        }
        message = message.trim()
        if (message !== '') {
            void this.lobbyMessageRepository.save(
                this.lobbyMessageRepository.create({
                    content: message,
                    user: lobbyUser.user,
                    lobbyId: lobbyUser.lobby.id,
                }),
            )
            this.emitChat(lobbyUser.lobby.code, lobbyUser.user.username, message)
        }
    }

    public emitChat(lobbyCode: string, username: string | null, message: string): void {
        this.server.to(lobbyCode).emit('chat', { username: username, message })
    }

    @SubscribeMessage('answer')
    async answer(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() answer: string,
    ): Promise<undefined> {
        let lobbyUser = await this.lobbyUserRepository.findOne({
            relations: ['lobby', 'user'],
            where: {
                user: {
                    id: client.user.id,
                },
                role: Not(LobbyUserRole.Spectator),
            },
        })
        if (!lobbyUser || lobbyUser.correctAnswer) {
            throw new WsException('Not found')
        }
        const lobby = lobbyUser.lobby
        if (lobby === undefined || lobby.status !== LobbyStatuses.PlayingMusic) {
            throw new WsException('Not found')
        }

        if (lobbyUser.hintMode) {
            Object.assign(lobbyUser, { ...lobbyUser, answer })
            await this.lobbyUserRepository.save(lobbyUser)
            this.server.to(lobby.code).emit(
                'lobbyUser',
                instanceToInstance<LobbyUser>(lobbyUser, {
                    groups: ['wsLobby'],
                    strategy: 'excludeAll',
                }),
            )
            return
        }

        lobbyUser = await this.verifyAnswer(lobby, answer, lobbyUser)
        if (lobbyUser.correctAnswer && !lobby.showCorrectAnswersDuringGuessTime) {
            client.emit(
                'lobbyUser',
                instanceToInstance<LobbyUser>(lobbyUser, {
                    groups: ['wsLobby'],
                    strategy: 'excludeAll',
                }),
            )
        } else {
            this.server.to(lobby.code).emit(
                'lobbyUser',
                instanceToInstance<LobbyUser>(lobbyUser, {
                    groups: ['wsLobby'],
                    strategy: 'excludeAll',
                }),
            )
        }

        if (!lobbyUser.correctAnswer) {
            await this.lobbyUserRepository.save({ ...lobbyUser, correctAnswer: null }) // set correct answer to null to prevent bugs
        }

        return
    }

    public async verifyAnswer(
        lobby: Lobby,
        answer: string,
        lobbyUser: LobbyUser,
    ): Promise<LobbyUser> {
        const answerQuery = this.lobbyMusicRepository
            .createQueryBuilder('lobbyMusic')
            .innerJoinAndSelect('lobbyMusic.expectedAnswers', 'expectedAnswers')
            .leftJoinAndSelect('expectedAnswers.alternativeNames', 'expectedAnswerAlternativeName')
            .leftJoinAndSelect('lobbyMusic.gameToMusic', 'gameToMusic')
            .leftJoinAndSelect('gameToMusic.game', 'game')
            .andWhere('expectedAnswers.enabled = 1')
            .andWhere('lobbyMusic.lobby = :lobby', { lobby: lobby.id })
            .andWhere('lobbyMusic.position = :position', {
                position: lobby.currentLobbyMusicPosition,
            })
            .andWhere(
                new Brackets((qb) => {
                    qb.orWhere('expectedAnswers.name LIKE :answer')
                    qb.orWhere(
                        new Brackets((qb4) => {
                            qb4.andWhere('expectedAnswerAlternativeName.enabled = 1')
                            qb4.andWhere('expectedAnswerAlternativeName.name LIKE :answer')
                        }),
                    )
                    if (lobby.allowCollectionAnswer) {
                        qb.orWhere('expectedAnswerCollection.name LIKE :answer')
                    }
                }),
            )
            .setParameter('answer', answer)
            .setParameter('position', lobby.currentLobbyMusicPosition)

        if (lobby.allowCollectionAnswer) {
            answerQuery.leftJoinAndSelect('expectedAnswers.collections', 'expectedAnswerCollection')
        }
        const lobbyMusic = await answerQuery.getOne()

        Object.assign(lobbyUser, {
            ...lobbyUser,
            correctAnswer: !!lobbyMusic,
            tries: lobbyUser.tries + 1,
            lastAnswerAt: dayjs().toDate(),
        })

        if (lobbyUser.correctAnswer && lobbyMusic) {
            let pointsToWin = 10
            if (lobbyUser.tries === 1) pointsToWin += 5
            Object.assign(lobbyUser, {
                ...lobbyUser,
                points: lobbyUser.points + (lobbyUser.hintMode ? 5 : pointsToWin),
                musicGuessedRight: lobbyUser.musicGuessedRight + 1,
            })

            await this.lobbyUserRepository.save(lobbyUser)
        }

        if (lobby.custom) {
            // Stats
            void this.lobbyStatService.increment(
                `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                lobbyUser.correctAnswer ? 'correct' : 'wrong',
            )
            void this.lobbyStatService.increment(
                `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                'tries',
            )
            if (!lobbyUser.hintMode) {
                if (lobbyUser.correctAnswer && lobbyMusic) {
                    const timeToAnswer = dayjs(lobbyUser.lastAnswerAt).diff(
                        dayjs(lobbyMusic.musicStartedPlayingAt),
                        'ms',
                    )
                    void this.lobbyStatService.rpush(
                        `lobby${lobby.code}:stats:user:${lobbyUser.id}:time`,
                        timeToAnswer,
                    )

                    if (lobbyUser.tries === 1) {
                        void this.lobbyStatService.increment(
                            `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                            'firstTry',
                        )
                    }
                }
            }
        }

        return lobbyUser
    }

    @SubscribeMessage('restart')
    async restart(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        const lobbyUser = await this.lobbyUserService.getLobbyHostByUser(client.user)
        if (lobbyUser === null) {
            return
        }
        await this.lobbyQueue.add('restart', lobbyUser.lobby.code, {
            jobId: `lobby${lobbyUser.lobby.code}restartManual-${Date.now()}`,
        })
    }

    @SubscribeMessage('kick')
    async kick(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() username: string,
    ): Promise<void> {
        const lobbyHost = await this.lobbyUserService.getLobbyHostByUser(client.user)
        if (lobbyHost === null) {
            return
        }
        const lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(
            username,
            lobbyHost.lobby,
        )
        if (!lobbyUser) {
            throw new WsException('Not found')
        }
        await this.lobbyUserRepository.remove(lobbyUser)
        await this.lobbyUserService.handlePlayerDisconnected(lobbyUser)
        this.emitChat(lobbyHost.lobby.code, null, `${username} has been kicked.`)
    }

    @SubscribeMessage('ban')
    async ban(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() username: string,
    ): Promise<void> {
        const lobbyHost = await this.lobbyUserService.getLobbyHostByUser(client.user)
        if (lobbyHost === null) {
            return
        }
        const lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(
            username,
            lobbyHost.lobby,
        )
        if (!lobbyUser) {
            throw new WsException('Not found')
        }

        const lobby = await this.lobbyRepository.findOne({
            relations: { bannedUsers: true },
            where: { id: lobbyHost.lobby.id },
        })

        if (lobby) {
            if (!lobby.bannedUsers) {
                lobby.bannedUsers = []
            }
            if (!lobby.bannedUsers.some((u) => u.id === lobbyUser.user.id)) {
                lobby.bannedUsers.push(lobbyUser.user)
                await this.lobbyRepository.save(lobby)
            }
        }

        await this.lobbyUserRepository.remove(lobbyUser)
        await this.lobbyUserService.handlePlayerDisconnected(lobbyUser)
        this.emitChat(lobbyHost.lobby.code, null, `${username} has been banned.`)
    }

    @SubscribeMessage('leave')
    async leave(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        const lobbyUser = await this.lobbyUserRepository.findOne({
            relations: {
                user: true,
            },
            where: {
                user: {
                    id: client.user.id,
                },
            },
        })
        if (lobbyUser === null) {
            return
        }
        await this.lobbyUserRepository.save({ ...lobbyUser, toDisconnect: true })
        await this.lobbyQueue.add('disconnectUser', lobbyUser.id, { removeOnComplete: true })
    }

    @SubscribeMessage('readyToPlayMusic')
    async readyToPlayMusic(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        const lobbyUser = await this.lobbyUserRepository.findOne({
            relations: {
                user: true,
                lobby: true,
            },
            where: {
                user: {
                    id: client.user.id,
                },
            },
        })
        if (lobbyUser === null) {
            return
        }

        // We do not care if the user is ready or not
        if (lobbyUser.lobby.status === LobbyStatuses.PlayingMusic) {
            Object.assign(lobbyUser, {
                ...lobbyUser,
                status: null,
            })
            await this.lobbyUserRepository.save(lobbyUser)
            this.server.to(lobbyUser.lobby.code).emit(
                'lobbyUser',
                instanceToInstance<LobbyUser>(lobbyUser, {
                    groups: ['wsLobby'],
                    strategy: 'excludeAll',
                }),
            )
            return
        }

        const updates = {
            status: LobbyUserStatus.ReadyToPlayMusic,
        }
        Object.assign(lobbyUser, updates)
        await this.lobbyUserRepository.update(lobbyUser.id, updates)
        this.server.to(lobbyUser.lobby.code).emit(
            'lobbyUser',
            instanceToInstance<LobbyUser>(lobbyUser, {
                groups: ['wsLobby'],
                strategy: 'excludeAll',
            }),
        )

        if (lobbyUser.lobby.status === LobbyStatuses.Buffering) {
            if (await this.lobbyUserService.areAllUsersReadyToPlay(lobbyUser.lobby)) {
                await this.lobbyQueue.add('playMusic', lobbyUser.lobby.code, {
                    jobId: `lobby${lobbyUser.lobby.code}playMusicEveryoneReady`,
                })
            }
        }
    }

    @SubscribeMessage('enableHintMode')
    async enableHintMode(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        let lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(client.user.username)
        if (lobbyUser === null) {
            throw new WsException('Not found')
        }
        if (lobbyUser.lobby.hintMode === LobbyHintMode.Disabled) {
            throw new WsException('')
        }
        if (!lobbyUser.correctAnswer) {
            lobbyUser = Object.assign(lobbyUser, { ...lobbyUser, hintMode: true })
            await this.lobbyUserRepository.save(lobbyUser)
            await this.showHintModeGames(lobbyUser, client)
            void this.lobbyStatService.increment(
                `lobby${lobbyUser.lobby.code}:stats:user:${lobbyUser.id}`,
                'hint',
            )
        } else {
            await this.showHintModeGames(lobbyUser, client, false)
        }
    }

    @SubscribeMessage('voteSkip')
    async voteSkip(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        const lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(client.user.username)
        if (lobbyUser === null) {
            throw new WsException('Not found')
        }
        if (lobbyUser.voteSkip) return
        if (!this.canVoteSkip(lobbyUser)) return

        const { lobby } = lobbyUser
        if (lobby.isPaused) return

        const voteSkip = (lobby.voteSkip += 1)
        lobbyUser.voteSkip = true
        await this.lobbyUserRepository.save(lobbyUser)
        await this.lobbyRepository.save(lobby)
        await this.sendLobbyUsers(lobby)
        await this.sendUpdateToRoom(lobby.code)
        if (voteSkip > lobby.lobbyUsers.length / 2) {
            const queryRunner = this.dataSource.createQueryRunner()
            await queryRunner.connect()
            const lockName = `vote-skip-lobby-${lobby.code}`
            try {
                const result = await queryRunner.query('SELECT GET_LOCK(?, 0) as gotLock', [
                    lockName,
                ])

                if (result[0].gotLock === 0) {
                    console.log(`Lobby ${lobby.code} already skipping...`)
                    return
                }
                lobby.voteSkip = 0
                lobby.lobbyUsers.map((lu) => {
                    lu.voteSkip = false
                })
                await this.lobbyRepository.save(lobby)
                await this.lobbyUserRepository.save(lobby.lobbyUsers)
                const delayedJobs = await this.lobbyQueue.getDelayed()
                const jobToDelete = delayedJobs.filter((j) => {
                    return j.data === lobby.code
                })
                if (jobToDelete.length > 0) {
                    for (const job of jobToDelete) {
                        await job.remove()
                    }
                    if (lobby.status === LobbyStatuses.PlayingMusic) {
                        this.logger.log(`Skipped waiting for revealAnswer in lobby ${lobby.code}`)
                        await this.lobbyQueue.add(
                            'revealAnswer',
                            { lobbyCode: lobby.code, skipped: true },
                            {
                                jobId: `lobby${lobby.code}RevealAnswerSkipped-${Date.now()}`,
                            },
                        )
                    } else {
                        this.logger.log(
                            `Skipped waiting for ${jobToDelete[0]!.name} in lobby ${lobby.code}`,
                        )
                        await this.lobbyQueue.add(
                            jobToDelete[0]!.name,
                            { lobbyCode: lobby.code, skipped: true },
                            {
                                jobId: `lobby${lobby.code}${jobToDelete[0]!.name}Skipped-${Date.now()}`,
                            },
                        )
                    }
                }
            } finally {
                await queryRunner.query('SELECT RELEASE_LOCK(?)', [lockName])
                await queryRunner.release()
            }
        }
    }

    @SubscribeMessage('unvoteSkip')
    async unvoteSkip(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        const lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(client.user.username)
        if (lobbyUser === null) {
            throw new WsException('Not found')
        }
        if (!lobbyUser.voteSkip) return
        if (!this.canVoteSkip(lobbyUser)) return
        const { lobby } = lobbyUser

        lobby.voteSkip -= 1
        lobbyUser.voteSkip = false
        await this.lobbyUserRepository.save(lobbyUser)
        await this.lobbyRepository.save(lobby)
        await this.sendLobbyUsers(lobby)
        await this.sendUpdateToRoom(lobby.code)
    }

    @SubscribeMessage('pauseResume')
    async pause(@ConnectedSocket() client: AuthenticatedSocket): Promise<void> {
        const lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(client.user.username)
        if (lobbyUser === null || lobbyUser.role !== LobbyUserRole.Host) {
            throw new WsException('Not found')
        }
        const { lobby } = lobbyUser
        lobby.isPaused = !lobby.isPaused
        if (lobby.isPaused) {
            // 1. Fetch all delayed jobs in the queue
            const delayedJobs = await this.lobbyQueue.getDelayed()

            // 2. Find the specific job for this lobby
            // (Since you nicely format your jobIds like `lobby${lobby.code}playMusic...`)
            const nextLobbyDelayedJob = delayedJobs.find(
                (job) =>
                    job.opts.jobId && (job.opts.jobId as string).includes(`lobby${lobby.code}`),
            )

            if (!nextLobbyDelayedJob) {
                throw new Error(`Could not find delayed job, couldn't pause lobby ${lobby.code}`)
            }
            // 3. Calculate the remaining delay
            const expectedExecutionTime =
                nextLobbyDelayedJob.timestamp + (nextLobbyDelayedJob.opts.delay || 0)
            const remainingTime = expectedExecutionTime - Date.now()

            // 4. Save the job info to the lobby
            lobby.pausedJobName = nextLobbyDelayedJob.name
            lobby.pausedJobRemainingDelay = Math.max(remainingTime, 0)

            // 5. Remove the specific delayed job so it doesn't fire
            await nextLobbyDelayedJob.remove()
            this.logger.debug(`Saved ${remainingTime}ms delay for job ${nextLobbyDelayedJob.name}`)
        } else {
            if (lobby.pausedJobName && lobby.pausedJobRemainingDelay !== null) {
                await this.lobbyQueue.add(lobby.pausedJobName, lobby.code, {
                    delay: lobby.pausedJobRemainingDelay,
                    jobId: `lobby${lobby.code}${lobby.pausedJobName}Resumed-${Date.now()}`,
                })
                this.logger.debug(
                    `Resuming ${lobby.pausedJobName} with ${lobby.pausedJobRemainingDelay}ms left.`,
                )
            }

            lobby.pausedJobName = null
            lobby.pausedJobRemainingDelay = null
        }
        await this.lobbyRepository.save(lobby)
        await this.sendUpdateToRoom(lobby.code)
    }

    private canVoteSkip(lobbyUser: LobbyUser): boolean {
        const { lobby } = lobbyUser
        if (lobbyUser.role === LobbyUserRole.Spectator) return false
        if (lobbyUser.disconnected || lobbyUser.toDisconnect) return false
        if (
            ![LobbyStatuses.PlayingMusic, LobbyStatuses.AnswerReveal].includes(
                lobby.status as LobbyStatuses,
            )
        )
            return false
        if (lobby.status === LobbyStatuses.PlayingMusic && !lobby.allowVoteSkipGuessing)
            return false
        if (lobby.status === LobbyStatuses.AnswerReveal && !lobby.allowVoteSkipAnswerReveal)
            return false

        return true
    }

    private async showHintModeGames(
        lobbyUser: LobbyUser,
        client: AuthenticatedSocket,
        emitToLobby = true,
    ): Promise<void> {
        const lobbyMusic = await this.lobbyMusicRepository.findOne({
            relations: {
                lobby: true,
                gameToMusic: {
                    music: true,
                },
                hintModeGames: true,
            },
            where: {
                lobby: {
                    id: lobbyUser.lobby.id,
                },
                position: lobbyUser.lobby.currentLobbyMusicPosition!,
            },
        })
        if (lobbyMusic) {
            client.emit('hintModeGames', getHintModeGameNames(lobbyMusic))
            if (emitToLobby) {
                this.server.to(lobbyUser.lobby.code).emit(
                    'lobbyUser',
                    instanceToInstance<LobbyUser>(lobbyUser, {
                        groups: ['wsLobby'],
                        strategy: 'excludeAll',
                    }),
                )
            }
        }
    }

    public async showHintModeGamesToHintModeUsers(
        lobbyMusic: LobbyMusic,
        lobbyId: number,
    ): Promise<void> {
        const lobbyUsers = await this.lobbyUserRepository.find({
            where: {
                lobby: {
                    id: lobbyId,
                },
                hintMode: true,
            },
        })
        if (lobbyUsers.length > 0) {
            this.server
                .to(lobbyUsers.map((lobbyUser) => `lobbyUser${lobbyUser.id}`))
                .emit('hintModeGames', getHintModeGameNames(lobbyMusic))
        }
    }

    @SubscribeMessage('toggleKeepHintMode')
    async toggleKeepHintMode(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() bool: boolean,
    ): Promise<void> {
        const lobbyUser = await this.lobbyUserService.getLobbyUserByUsername(client.user.username)
        if (lobbyUser === null) {
            throw new WsException('Not found')
        }
        if (lobbyUser.lobby.hintMode === LobbyHintMode.Disabled) {
            throw new WsException('')
        }
        await this.lobbyUserRepository.save({ ...lobbyUser, keepHintMode: bool })
    }

    afterInit(): void {
        const middle = WSAuthMiddleware(this.jwtService, this.userService, this.lobbyUserRepository)
        this.server.use(middle)
    }

    handleConnection(client: AuthenticatedSocket, ...args: any): any {
        client.on('disconnecting', async (reason) => {
            if (reason === 'server namespace disconnect') {
                return
            }
            if (client.user === undefined) {
                return
            }
            const lobbyUser = await this.lobbyUserRepository.findOne({
                relations: {
                    user: true,
                },
                where: {
                    user: {
                        id: client.user.id,
                    },
                },
            })
            if (lobbyUser === null) {
                return
            }
            if (lobbyUser.isReconnecting) {
                // don't disconnect if reconnecting
                return
            }
            await this.lobbyUserRepository.save({ ...lobbyUser, toDisconnect: true })
            await this.lobbyQueue.add('disconnectUser', lobbyUser.id, {
                delay: 30 * 1000, // 30 seconds
            })
        })
    }

    async sendUpdateToRoom(code: string): Promise<void> {
        const lobby = await this.lobbyRepository.findOne({
            relations: {
                lobbyMusics: true,
            },
            where: { code },
        })
        if (!lobby) return
        this.server.to(lobby.code).emit(
            'lobby',
            instanceToInstance<Lobby>(lobby, {
                groups: ['lobby'],
                strategy: 'excludeAll',
                excludeExtraneousValues: false,
            }),
        )
    }

    sendLobbyError(lobby: Lobby, message: string): void {
        this.server.to(lobby.code).emit('error', message)
    }

    sendCurrentLobbyMusicToLoad(lobby: Lobby): void {
        this.server.to(lobby.code).emit('currentRoundBufferReady')
    }

    playMusic(lobbyMusic: LobbyMusic, client?: AuthenticatedSocket): void {
        if (client) {
            client.emit('currentLobbyMusic', {
                contributeToMissingData: lobbyMusic.contributeToMissingData,
                musicFinishesIn: dayjs(lobbyMusic.musicFinishPlayingAt).diff(dayjs(), 'seconds'),
            })
        } else {
            this.server.to(lobbyMusic.lobby.code).emit('currentLobbyMusic', {
                contributeToMissingData: lobbyMusic.contributeToMissingData,
            })
        }
    }

    sendLobbyClosed(lobby: Lobby): void {
        this.server.in(lobby.code).disconnectSockets()
    }

    sendLobbyStartBuffer(lobby: Lobby): void {
        this.server.to(lobby.code).emit('lobbyStartBuffer')
    }

    sendLobbyBufferEnd(lobby: Lobby): void {
        this.server.to(lobby.code).emit('lobbyBufferEnd')
    }

    async sendLobbyUsers(
        lobby: Lobby,
        lobbyUsers?: LobbyUser[],
        client?: AuthenticatedSocket,
    ): Promise<void> {
        if (!lobbyUsers) {
            lobbyUsers = await this.lobbyUserRepository.find({
                relations: {
                    lobby: true,
                    user: { patreonAccount: true },
                },
                where: {
                    lobby: {
                        id: lobby.id,
                    },
                },
            })
        }
        const receiver = client ?? this.server.to(lobby.code)
        receiver.emit(
            'lobbyUsers',
            instanceToInstance<LobbyUser[]>(lobbyUsers, {
                groups: ['wsLobby'],
                strategy: 'excludeAll',
            }),
        )
    }

    sendAnswer(lobbyMusic: LobbyMusic, client?: AuthenticatedSocket): void {
        const data = instanceToInstance<LobbyMusic>(lobbyMusic, {
            strategy: 'excludeAll',
            groups: ['lobby-answer-reveal'],
        })
        if (client) {
            client.emit('lobbyAnswer', data)
        } else {
            this.server.to(lobbyMusic.lobby.code).emit('lobbyAnswer', data)
        }
    }
    sendLobbyReset(lobby: Lobby): void {
        this.server
            .to(lobby.code)
            .emit('lobbyReset', instanceToInstance<Lobby>(lobby, { groups: ['lobby'] }))
    }

    sendLobbyToast(lobby: Lobby, message: string): void {
        this.server.to(lobby.code).emit('lobbyToast', message)
    }

    sendLobbyLoadProgress(lobby: Lobby, message: number | string | undefined): void {
        this.server.to(lobby.code).emit('lobbyLoadProgress', message)
    }

    async sendResultData(lobby: Lobby) {
        const patreons = await this.oAuthPatreonRepository.find({
            relations: { user: true },
            where: { currentlyEntitledTiers: Not('') },
            order: { campaignLifetimeSupportCents: 'DESC' },
        })

        const databaseContributors = await this.gameToMusicRepository
            .createQueryBuilder('gtm')
            .select('user.username', 'username')
            .addSelect('count(gtm.id)', 'contributions')
            .innerJoin('gtm.addedBy', 'user')
            .groupBy('user.username')
            .orderBy('contributions', 'DESC')
            .getRawMany()

        // SELECT count(*), addedById, username FROM vgmq.game_to_music join vgmq.user on user.id = addedById group by addedById;
        const data = {
            patreons: patreons.map((patreon) => patreon.user.username),
            databaseContributors: databaseContributors.map((contributor) => contributor.username),
        }

        this.server.to(lobby.code).emit('result', data)
    }
}
