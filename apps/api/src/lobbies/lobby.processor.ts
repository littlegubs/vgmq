import { spawn } from 'child_process'
import * as process from 'node:process'

import {
    InjectQueue,
    OnQueueCompleted,
    OnQueueError,
    OnQueueFailed,
    OnQueueStalled,
    OnQueueWaiting,
    Process,
    Processor,
} from '@nestjs/bull'
import { Inject, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Job, Queue } from 'bull'
import dayjs from 'dayjs'
import { In, Not, Repository } from 'typeorm'

import { MusicAccuracy } from '../games/entity/music-accuracy.entity'
import { UsersService } from '../users/users.service'
import { LobbyMusic } from './entities/lobby-music.entity'
import { LobbyUser, LobbyUserRole, LobbyUserStatus } from './entities/lobby-user.entity'
import { Lobby, LobbyGameModes, LobbyHintMode, LobbyStatuses } from './entities/lobby.entity'
import { LobbyGateway } from './lobby.gateway'
import { LobbyMusicLoaderService } from './services/lobby-music-loader.service'
import { LobbyUserService } from './services/lobby-user.service'
import { LobbyStatService } from './services/lobby-stat.service'
import { StorageService } from '../storage/storage.interface'
import { CLIPS_STORAGE, PRIVATE_STORAGE } from '../storage/storage.constants'
import { randomUUID } from 'node:crypto'

@Processor('lobby')
export class LobbyProcessor {
    constructor(
        private lobbyGateway: LobbyGateway,
        @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
        @InjectRepository(LobbyMusic) private lobbyMusicRepository: Repository<LobbyMusic>,
        @InjectRepository(LobbyUser) private lobbyUserRepository: Repository<LobbyUser>,
        @InjectRepository(MusicAccuracy) private musicAccuracyRepository: Repository<MusicAccuracy>,
        @InjectQueue('lobby') private lobbyQueue: Queue,
        private lobbyUserService: LobbyUserService,
        private userService: UsersService,
        @Inject(PRIVATE_STORAGE) private privateStorageService: StorageService,
        @Inject(CLIPS_STORAGE) private clipsStorageService: StorageService,
        private lobbyMusicLoaderService: LobbyMusicLoaderService,
        private configService: ConfigService,
        private lobbyStatService: LobbyStatService,
    ) {}
    private readonly logger = new Logger(LobbyProcessor.name)

    @Process('bufferMusic')
    async buffer(job: Job): Promise<void> {
        const { lobbyCode, skipped } = this.getJobData(job)
        this.logger.debug(`Start buffering music to lobby ${lobbyCode}`)
        let lobby = await this.lobbyRepository.findOne({
            relations: ['lobbyMusics'],
            where: {
                code: lobbyCode,
                status: In([LobbyStatuses.Playing, LobbyStatuses.AnswerReveal]),
            },
        })
        if (lobby === null) {
            this.logger.warn(`Music buffer: lobby ${lobbyCode} ERROR: Lobby has been deleted`)
            return
        }
        if (lobby.isPaused) {
            this.logger.debug(
                `Job ${job.name} aborted for lobby ${lobbyCode} because it is paused.`,
            )
            return
        }
        if (lobby.status === LobbyStatuses.Playing) {
            lobby = this.lobbyRepository.create({
                ...lobby,
                currentLobbyMusicPosition: 1,
                status: LobbyStatuses.Buffering,
            })
        }

        let lobbyMusic = await this.lobbyMusicRepository.findOne({
            relations: {
                lobby: true,
                gameToMusic: {
                    music: true,
                },
            },
            where: {
                lobby: {
                    id: lobby.id,
                },
                position:
                    lobby.status === LobbyStatuses.Buffering
                        ? 1
                        : lobby.currentLobbyMusicPosition! + 1,
            },
        })
        if (!lobbyMusic) {
            if (lobby.custom && lobby.musicNumber !== -1) {
                await this.lobbyQueue.add('restart', lobby.code, {
                    jobId: `lobby${lobby.code}restartFromBufferMusic-${Date.now()}`,
                })
                return
            }
            const countUsers = await this.lobbyUserRepository.count({
                relations: { lobby: true },
                where: {
                    lobby: {
                        id: lobby.id,
                    },
                },
            })
            if (countUsers === 0) {
                lobby.loopsWithNoUsers += 1
                if (lobby.loopsWithNoUsers > 5) {
                    await this.lobbyQueue.add('restart', lobby.code, {
                        jobId: `publicLobby${lobby.code}restartFromBufferMusic-${Date.now()}`,
                    })
                    return
                }
                await this.lobbyRepository.save(lobby)
            }
            lobbyMusic = await this.lobbyMusicLoaderService.loadMusic(lobby)
            lobby.lobbyMusics = [...lobby.lobbyMusics, lobbyMusic]
        }

        lobby = this.lobbyRepository.create(
            await this.lobbyRepository.save({
                ...lobby,
            }),
        )

        const lobbyUsers = await this.lobbyUserRepository.find({
            relations: {
                user: true,
                lobby: true,
            },
            where: {
                lobby: {
                    id: lobby.id,
                },
                disconnected: false,
            },
        })
        const updatePromises = lobbyUsers.map((lobbyUser) =>
            this.lobbyUserRepository.update(lobbyUser.id, {
                correctAnswer: lobbyUser.correctAnswer || null,
                status: null,
            }),
        )
        await Promise.all(updatePromises)
        this.lobbyGateway.sendLobbyStartBuffer(lobby)
        await this.lobbyGateway.sendLobbyUsers(lobby)
        this.logger.debug(`will call playMusic for lobby ${lobby.code}`)

        if (!skipped) {
            // If the user doesn't skip, work as usual and wait 5s before playing next music
            // otherwise, play music right when the buffering is done (see ffmpeg process below)
            await this.lobbyQueue.add('playMusic', lobbyMusic.lobby.code, {
                delay: 5 * 1000,
                jobId: `lobby${lobby.code}playMusic-${Date.now()}`,
            })
            this.logger.debug(`playMusic should start in 5s for lobby ${lobby.code}`)
        }
        if (lobby.status === LobbyStatuses.Buffering) {
            await this.lobbyGateway.sendUpdateToRoom(lobby.code)
        }
        const gameToMusic = lobbyMusic.gameToMusic
        const url = await this.privateStorageService.getPublicUrl(gameToMusic.music.file.path)
        const ffmpegPath = this.configService.get<string>('FFMPEG_PATH')
        if (ffmpegPath === undefined) {
            throw new Error('FFMPEG_PATH could not be found.')
        }
        const ffmpegArgs = this.configService.get<string>('FFMPEG_ARGS') ?? ''
        const resolvedFfmpegArgs = ffmpegArgs.replace('$PWD', process.cwd())
        const args = [
            ...resolvedFfmpegArgs.split(' '),
            '-loglevel',
            'error',
            '-i',
            url.startsWith('./') ? url.substring(1) : `"${url}"`,
            '-vn',
            '-ss',
            lobbyMusic.startAt > 0 ? `${lobbyMusic.startAt}` : '0.001',
            '-t',
            `${lobbyMusic.lobby.playMusicOnAnswerReveal ? lobbyMusic.lobby.guessTime + 10 : lobbyMusic.lobby.guessTime}`,
            '-map',
            '0:a',
            '-af',
            'aresample',
            '-map_metadata',
            '-1',
            '-f',
            'mp3',
            '-',
        ]

        const ffmpegProcess = spawn(ffmpegPath, args, {
            env: process.env,
            shell: true,
        })
        const output: Buffer[] = []
        ffmpegProcess.stdout.on('data', (data: Buffer) => {
            output.push(data)
        })

        ffmpegProcess.stderr.on('data', () => {
            // somehow, listening to this event unlocks the event ffmpegProcess.stdout.on('data') for some files ???
        })
        this.logger.debug(`bufferMusic for ${lobby.code} could be stuck`)
        void new Promise((resolve, reject) => {
            void ffmpegProcess.on('close', async (code) => {
                this.lobbyGateway.sendLobbyBufferEnd(lobby!)
                if (code === 0) {
                    const finalBuffer = Buffer.concat(output)

                    const clipPath = `${randomUUID()}.mp3`

                    try {
                        await this.clipsStorageService.putObject(clipPath, finalBuffer)
                        lobbyMusic!.loaded = true
                        lobbyMusic!.clipPath = clipPath
                        await this.lobbyMusicRepository.save(lobbyMusic)
                        this.logger.debug(`clip written: ${clipPath}`)
                    } catch (error) {
                        this.logger.error('Error while writing the clip file', error)
                        console.log(error)
                        reject('The server could not load the music')
                        return
                    }

                    const lobbyUsersUpdatePromises = lobbyUsers.map((lobbyUser) => {
                        const updates = {
                            status: LobbyUserStatus.Buffering,
                        }
                        Object.assign(lobbyUser, updates)

                        return this.lobbyUserRepository.update(lobbyUser.id, updates)
                    })
                    void Promise.all(lobbyUsersUpdatePromises).then(() => {
                        void this.lobbyGateway.sendLobbyUsers(lobby!).then(() => {
                            this.lobbyGateway.sendCurrentLobbyMusicToLoad(lobby)
                            if (skipped) {
                                void this.lobbyQueue.add('playMusic', lobbyMusic.lobby.code, {
                                    jobId: `lobby${lobby.code}playMusicASAP-${Date.now()}`,
                                })
                                this.logger.debug(
                                    `playMusic NOW since this was skipped for lobby ${lobby.code}`,
                                )
                            }
                        })
                    })
                    this.logger.debug(`nevermind! bufferMusic for ${lobby!.code} resolved`)
                    resolve(null)
                } else {
                    this.logger.debug(
                        `nevermind! bufferMusic for ${
                            lobby!.code
                        } rejected, but could still be stuck`,
                    )

                    reject('the server could not encode the music')
                    if (skipped) {
                        void this.lobbyQueue.add('playMusic', lobbyMusic.lobby.code, {
                            jobId: `lobby${lobby.code}playMusicASAP-${Date.now()}`,
                        })
                        this.logger.debug(
                            `playMusic NOW since this was skipped for lobby ${lobby.code}`,
                        )
                    }
                }
            })
        }).catch(async (err: string) => {
            this.lobbyGateway.sendLobbyError(lobby!, err)
            this.logger.debug(`bufferMusic for ${lobby!.code}: catch ffmpeg error part 1/3`)
            if (lobbyUsers.length > 0) {
                await this.lobbyUserRepository.update(
                    lobbyUsers.map((lu) => lu.id),
                    { status: null },
                )
            }

            this.logger.debug(`bufferMusic for ${lobby!.code}: catch ffmpeg error part 2/3`)
            await this.lobbyGateway.sendLobbyUsers(lobby!)
            this.logger.debug(`bufferMusic for ${lobby!.code}: catch ffmpeg error part 3/3`)
        })
        this.logger.debug(`bufferMusic for ${lobby.code} fully unstuck!`)
    }

    @Process('playMusic')
    async playMusic(job: Job): Promise<void> {
        const { lobbyCode } = this.getJobData(job)
        this.logger.debug(`Start playing music to lobby ${lobbyCode}`)
        let lobby = await this.lobbyRepository.findOne({
            relations: ['lobbyMusics'],
            where: {
                code: lobbyCode,
                status: Not(LobbyStatuses.PlayingMusic),
            },
        })
        if (lobby === null) {
            this.logger.warn(`Play music: lobby ${lobbyCode} ERROR: Lobby has been deleted`)
            return
        }
        if (lobby.isPaused) {
            this.logger.debug(
                `Job ${job.name} aborted for lobby ${lobbyCode} because it is paused.`,
            )
            return
        }

        const lobbyUsers = await this.lobbyUserRepository.find({
            relations: {
                lobby: true,
                user: true,
            },
            where: {
                lobby: {
                    id: lobby.id,
                },
            },
        })

        if (lobby.status === LobbyStatuses.AnswerReveal) {
            lobby = this.lobbyRepository.create({
                ...lobby,
                currentLobbyMusicPosition:
                    lobby.currentLobbyMusicPosition === null
                        ? 1
                        : lobby.currentLobbyMusicPosition + 1,
            })
            if (!(await this.lobbyUserService.areAllUsersReadyToPlay(lobby))) {
                lobby = this.lobbyRepository.create(
                    await this.lobbyRepository.save({
                        ...lobby,
                        status: LobbyStatuses.Buffering,
                    }),
                )
                const updatePromises = lobbyUsers.map((lobbyUser) => {
                    return this.lobbyUserRepository.update(lobbyUser.id, {
                        correctAnswer: null,
                        playedTheGame: null,
                        answer: null,
                        hintMode:
                            lobby!.hintMode === LobbyHintMode.Always || lobbyUser.keepHintMode,
                    })
                })

                await Promise.all(updatePromises)
                await this.lobbyGateway.sendLobbyUsers(lobby)
                await this.lobbyGateway.sendUpdateToRoom(lobby.code)
                this.logger.debug(`will call playMusicForced for lobby ${lobby.code}`)
                console.log('from playMusic')

                await this.lobbyQueue
                    .add('playMusic', lobby.code, {
                        delay: 5 * 1000,
                        jobId: `lobby${lobby.code}playMusicForced-${Date.now()}`,
                    })
                    .catch((reason) => {
                        this.logger.debug(`playMusic couldn't be called, reason: ${reason}`)
                    })
                this.logger.debug(`playMusicForced for lobby ${lobby.code} should start in 5sec...`)
                return
            }
        }
        this.logger.debug(`about to set lobby ${lobby.code} to status play_music`)
        lobby = this.lobbyRepository.create(
            await this.lobbyRepository.save({
                ...lobby,
                status: LobbyStatuses.PlayingMusic,
                voteSkip: 0,
            }),
        )
        this.logger.debug(`set lobby ${lobby.code} to status play_music`)

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
                    id: lobby.id,
                },
                position: lobby.currentLobbyMusicPosition!,
            },
        })
        if (!lobbyMusic) {
            await this.lobbyQueue.add('restart', lobby.code, {
                jobId: `lobby${lobby.code}restartFromPlayMusic-${Date.now()}`,
            })
            return
        }

        const updatePromises = lobbyUsers.map((lobbyUser) =>
            this.lobbyUserRepository.update(lobbyUser.id, {
                correctAnswer: null,
                playedTheGame: null,
                tries: 0,
                ...(lobbyUser.status === LobbyUserStatus.ReadyToPlayMusic && { status: null }),
                hintMode: lobby!.hintMode === LobbyHintMode.Always || lobbyUser.keepHintMode, // why do I have to use '!' here ??
                answer: null,
                voteSkip: false,
            }),
        )
        await Promise.all(updatePromises)
        await this.lobbyGateway.showHintModeGamesToHintModeUsers(lobbyMusic, lobby.id)

        await this.lobbyGateway.sendLobbyUsers(lobby)
        this.lobbyGateway.playMusic(lobbyMusic)
        await this.lobbyGateway.sendUpdateToRoom(lobby.code)
        this.logger.debug(`will call revealAnswer for lobby ${lobby.code}`)
        await this.lobbyQueue
            .add('revealAnswer', lobby.code, {
                delay: lobby.guessTime * 1000,
                jobId: `lobby${lobby.code}revealAnswer${
                    lobby.currentLobbyMusicPosition
                }-${Date.now()}`,
            })
            .catch((reason) => {
                this.logger.debug(`revealAnswer couldn't be called, reason: ${reason}`)
            })
        this.logger.debug(
            `revealAnswer for lobby ${lobby.code} should start in ${lobby.guessTime}sec...`,
        )
        const date = dayjs()
        await this.lobbyMusicRepository.save({
            ...lobbyMusic,
            musicStartedPlayingAt: date.toDate(),
            musicFinishPlayingAt: date.add(lobbyMusic.lobby.guessTime, 'seconds').toDate(),
        })
    }

    @Process('revealAnswer')
    async revealAnswer(job: Job<string>): Promise<void> {
        const { lobbyCode } = this.getJobData(job)
        this.logger.debug(`Start answer reveal to lobby ${lobbyCode}`)

        let lobby = await this.lobbyRepository.findOne({
            relations: {
                lobbyMusics: true,
            },
            where: { code: lobbyCode, status: LobbyStatuses.PlayingMusic },
        })
        if (lobby === null) {
            this.logger.warn(`Reveal Answer: lobby ${lobbyCode} ERROR: Lobby has been deleted`)
            return
        }
        if (lobby.isPaused) {
            this.logger.debug(
                `Job ${job.name} aborted for lobby ${lobbyCode} because it is paused.`,
            )
            return
        }

        lobby = this.lobbyRepository.create(
            await this.lobbyRepository.save({
                ...lobby,
                status: LobbyStatuses.AnswerReveal,
                voteSkip: 0,
            }),
        )
        const currentLobbyMusic = await this.lobbyMusicRepository.findOne({
            relations: {
                lobby: true,
                gameToMusic: {
                    music: true,
                    game: {
                        platforms: true,
                        cover: {
                            colorPalette: true,
                        },
                    },
                },
                video: true,
                screenshots: true,
            },
            where: {
                lobby: {
                    id: lobby.id,
                },
                position: lobby.currentLobbyMusicPosition ?? 0,
            },
        })
        if (currentLobbyMusic === null) {
            this.logger.error(
                `lobby ${lobby.code} ERROR: Trying to get a music that does not exist`,
            )
            lobby = this.lobbyRepository.create(
                await this.lobbyRepository.save({
                    ...lobby,
                    currentLobbyMusicPosition: null,
                    status: LobbyStatuses.Waiting,
                }),
            )
            await this.lobbyGateway.sendUpdateToRoom(lobby.code)
            return
        }
        let lobbyUsers = await this.lobbyUserRepository.find({
            relations: {
                user: true,
            },
            where: {
                lobby: {
                    id: lobby.id,
                },
                role: In([LobbyUserRole.Host, LobbyUserRole.Player]),
            },
        })

        for (let lobbyUser of lobbyUsers) {
            if (lobbyUser.hintMode && lobbyUser.answer) {
                lobbyUser = await this.lobbyGateway.verifyAnswer(lobby, lobbyUser.answer, lobbyUser)
            } else if (lobbyUser.correctAnswer !== true) {
                void this.lobbyStatService.increment(
                    `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                    'wrong',
                )
            }
            const userPlayedTheGame = await this.userService.userHasPlayedTheGame(
                lobbyUser.user,
                currentLobbyMusic.gameToMusic.game,
            )

            await this.lobbyUserRepository.update(lobbyUser.id, {
                playedTheGame: !!userPlayedTheGame,
                voteSkip: false,
            })
        }
        await this.lobbyGateway.sendLobbyUsers(lobby)
        await this.lobbyGateway.sendUpdateToRoom(lobby.code)
        this.lobbyGateway.sendAnswer(currentLobbyMusic)

        if (
            lobby.currentLobbyMusicPosition === lobby.lobbyMusics.length &&
            lobby.custom &&
            lobby.musicNumber !== -1
        ) {
            await this.lobbyQueue.add('result', lobby.code, {
                delay: 10000,
                jobId: `lobby${lobby.code}result-${Date.now()}`,
            })
        } else {
            await this.lobbyQueue.add('bufferMusic', lobby.code, {
                delay: 5 * 1000,
                jobId: `lobby${lobby.code}bufferMusic-${Date.now()}`,
            })
        }

        if (
            lobby.gameMode === LobbyGameModes.LocalCouch ||
            (!lobby.custom && lobby.musicNumber === -1)
        ) {
            return
        }

        lobbyUsers = await this.lobbyUserRepository.find({
            relations: {
                user: true,
            },
            where: {
                lobby: {
                    id: lobby.id,
                },
                disconnected: false,
                role: In([LobbyUserRole.Host, LobbyUserRole.Player]),
            },
        })
        for (const lobbyUser of lobbyUsers) {
            if (!lobbyUser.disconnected) {
                const userPlayedTheGame = await this.userService.userHasPlayedTheGame(
                    lobbyUser.user,
                    currentLobbyMusic.gameToMusic.game,
                )

                await this.musicAccuracyRepository.save({
                    playedTheGame: !!userPlayedTheGame,
                    correctAnswer: !!lobbyUser.correctAnswer,
                    gameToMusic: currentLobbyMusic.gameToMusic,
                    hintMode: lobbyUser.hintMode,
                    user: lobbyUser.user,
                })
            }
        }
    }

    @Process('result')
    async result(job: Job): Promise<void> {
        const { lobbyCode } = this.getJobData(job)
        this.logger.debug(`Show lobby ${lobbyCode} results`)

        let lobby = await this.lobbyRepository.findOne({
            relations: {
                lobbyMusics: true,
                lobbyUsers: {
                    user: true,
                },
            },
            where: { code: lobbyCode, status: LobbyStatuses.AnswerReveal },
        })
        if (lobby === null) {
            this.logger.warn(`Result: lobby ${lobbyCode} ERROR: Lobby has been deleted`)
            return
        }
        lobby = this.lobbyRepository.create(
            await this.lobbyRepository.save({
                ...lobby,
                status: LobbyStatuses.Result,
            }),
        )
        await this.lobbyStatService.retrieveResultData(lobby)
        await this.lobbyGateway.sendLobbyUsers(lobby, lobby.lobbyUsers)
        await this.lobbyGateway.sendResultData(lobby)
        await this.lobbyGateway.sendUpdateToRoom(lobby.code)
    }

    @Process('restart')
    async restart(job: Job): Promise<void> {
        const { lobbyCode } = this.getJobData(job)
        this.logger.debug(`Set lobby ${lobbyCode} back to waiting `)

        await this.resetLobby(lobbyCode)
    }

    private async resetLobby(lobbyCode: string): Promise<void> {
        let lobby = await this.lobbyRepository.findOne({
            relations: ['lobbyMusics'],
            where: { code: lobbyCode },
        })
        if (lobby === null) {
            this.logger.warn(`Reset lobby: lobby ${lobbyCode} ERROR: Lobby has been deleted`)
            return
        }
        await this.lobbyMusicRepository.remove(lobby.lobbyMusics)
        lobby = this.lobbyRepository.create(
            await this.lobbyRepository.save({
                ...lobby,
                status: LobbyStatuses.Waiting,
                loopsWithNoUsers: 0,
                currentLobbyMusicPosition: null,
                voteSkip: 0,
                isPaused: false,
                pausedJobName: null,
                pausedJobRemainingDelay: null,
            }),
        )
        await this.lobbyQueue.removeJobs(`*${lobbyCode}*`)
        await this.lobbyStatService.deleteLobbyStatsKeys(lobbyCode)
        await this.removeDisconnectedUsers(lobby)
        await this.setSpectatorsAsPlayer(lobby)
        await this.resetUserState(lobby)

        await this.lobbyGateway.sendLobbyUsers(lobby)
        this.lobbyGateway.sendLobbyReset(lobby)
    }

    private async resetUserState(lobby: Lobby): Promise<void> {
        const lobbyUsers = await this.lobbyUserRepository.find({
            relations: ['user', 'lobby'],
            where: {
                lobby: {
                    id: lobby.id,
                },
            },
        })
        await this.lobbyUserRepository.save(
            lobbyUsers.map((lobbyUser) => ({
                ...lobbyUser,
                correctAnswer: null,
                answer: null,
                status: null,
                playedTheGame: null,
                points: 0,
                musicGuessedRight: 0,
                tries: 0,
                hintMode: false,
                keepHintMode: false,
                voteSkip: false,
            })),
        )
    }

    private async removeDisconnectedUsers(lobby: Lobby): Promise<void> {
        const disconnectedLobbyUsers = await this.lobbyUserRepository.find({
            where: {
                lobby: {
                    id: lobby.id,
                },
                disconnected: true,
            },
        })
        if (lobby.gameMode !== LobbyGameModes.LocalCouch) {
            // remove disconnected users
            await this.lobbyUserRepository.remove(disconnectedLobbyUsers)
            for (const disconnectedLobbyUser of disconnectedLobbyUsers) {
                await this.lobbyUserService.handlePlayerDisconnected(disconnectedLobbyUser)
            }
        } else {
            await this.lobbyUserRepository.save(
                disconnectedLobbyUsers.map((lobbyUser) => ({ ...lobbyUser, disconnected: false })),
            )
        }
    }

    private async setSpectatorsAsPlayer(lobby: Lobby): Promise<void> {
        const lobbySpectators = await this.lobbyUserRepository.find({
            where: {
                lobby: {
                    id: lobby.id,
                },
                role: LobbyUserRole.Spectator,
            },
        })
        await this.lobbyUserRepository.save(
            lobbySpectators.map((lobbyUser) => ({ ...lobbyUser, role: LobbyUserRole.Player })),
        )
    }

    @Process('disconnectUser')
    async disconnectUser(job: Job<number>): Promise<void> {
        const lobbyUser = await this.lobbyUserRepository.findOne({
            where: {
                id: job.data,
                toDisconnect: true,
            },
        })
        if (lobbyUser === null) {
            return
        }
        if (
            lobbyUser.lobby.status === LobbyStatuses.Waiting ||
            lobbyUser.lobby.status === LobbyStatuses.Result ||
            lobbyUser.role === LobbyUserRole.Spectator ||
            (!lobbyUser.lobby.custom && lobbyUser.lobby.musicNumber === -1)
        ) {
            await this.lobbyUserRepository.remove(lobbyUser)
        } else {
            await this.lobbyUserRepository.update(lobbyUser.id, { disconnected: true })
        }
        await this.lobbyUserService.handlePlayerDisconnected(lobbyUser)
        await this.lobbyGateway.sendLobbyUsers(lobbyUser.lobby)
    }

    private getJobData(job: Job): { lobbyCode: string; skipped: boolean } {
        if (typeof job.data === 'string') {
            return { lobbyCode: job.data, skipped: false }
        }
        return { lobbyCode: job.data.lobbyCode, skipped: job.data.skipped }
    }

    @OnQueueStalled()
    onStalled(job: Job): void {
        this.logger.error(`Job stalled ${job.id} of type ${job.name} with data ${job.data}...`)
    }

    @OnQueueError()
    onError(error: Error): void {
        this.logger.error(`Job error`)
        this.logger.error(`${error.message}`)
        this.logger.error(`${error.stack}`)
    }

    @OnQueueWaiting()
    onWaiting(jobId: number): void {
        this.logger.log(`Job waiting ${jobId}`)
    }

    @OnQueueCompleted()
    onComplete(job: Job): void {
        this.logger.log(`Job completed ${job.id} of type ${job.name} with data ${job.data}...`)
    }

    @OnQueueFailed()
    onFail(job: Job<string>, err: Error): void {
        this.logger.error(
            `Job failed ${job.id} of type ${job.name} with data ${job.data}... due to error:`,
        )
        this.logger.error(`${err.message}`)
        this.logger.error(`${err.stack}`)
        const lobbyCode = job.data
        this.logger.debug(`Set lobby ${lobbyCode} back to waiting after error`)

        void this.resetLobby(lobbyCode)
    }
}
