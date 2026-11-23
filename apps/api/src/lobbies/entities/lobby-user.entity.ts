import { Expose, Transform, Type } from 'class-transformer'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { User } from '../../users/user.entity'
import { Lobby } from './lobby.entity'

export enum LobbyUserRole {
    Host = 'host',
    Player = 'player',
    Spectator = 'spectator',
}

export enum LobbyUserStatus {
    Buffering = 'buffering',
    ReadyToPlayMusic = 'ready_to_play_music',
}

class LobbyUserStat {
    @Expose({ groups: ['wsLobby'] })
    value?: number
    @Expose({ groups: ['wsLobby'] })
    color?: 'best' | 'worst'
}

class LobbyUserStats {
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    correctAnswers: LobbyUserStat
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    wrongAnswers: LobbyUserStat
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    tries: LobbyUserStat
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    firstTries: LobbyUserStat
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    hint: LobbyUserStat
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    shortestTime: LobbyUserStat
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    longestTime: LobbyUserStat
    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStat)
    averageTime: LobbyUserStat
}

@Entity()
export class LobbyUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: LobbyUserRole,
        default: LobbyUserRole.Player,
    })
    @Expose({ groups: ['wsLobby'] })
    role: string

    @Column({ type: 'int', default: 0 })
    @Expose({ groups: ['wsLobby'] })
    points: number

    @Column({ type: 'int', default: 0 })
    @Expose({ groups: ['wsLobby'] })
    musicGuessedRight: number

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['wsLobby'] })
    disconnected: boolean

    @Column({ type: 'boolean', default: false })
    toDisconnect: boolean

    @Column({ type: 'boolean', default: false })
    isReconnecting: boolean

    @Column({ nullable: true, type: 'enum', enum: LobbyUserStatus })
    @Expose({ groups: ['wsLobby'] })
    status: string | null

    @Column({ type: 'varchar', nullable: true })
    @Expose({ groups: ['wsLobby'] })
    @Transform(({ value }) => !!value)
    answer: string | null

    @Column({ type: 'boolean', nullable: true })
    @Expose({ groups: ['wsLobby'] })
    correctAnswer: boolean | null

    @Column({ type: 'int', default: 0 })
    tries: number

    @Column({ type: 'boolean', nullable: true })
    @Expose({ groups: ['wsLobby'] })
    playedTheGame: boolean | null

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['wsLobby'] })
    hintMode = false

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['wsLobby'] })
    keepHintMode = false

    /**
     * This value is used to determine if we should remove the user after not giving an answer for a while
     */
    @Column({ type: 'datetime', nullable: true })
    lastAnswerAt: Date | null

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['wsLobby'] })
    voteSkip: boolean

    @OneToOne(() => User, (user) => user.currentLobby, { onDelete: 'CASCADE' })
    @Expose({ groups: ['wsLobby'] })
    @JoinColumn()
    user: User

    @ManyToOne(() => Lobby, (lobby) => lobby.lobbyUsers, {
        onDelete: 'CASCADE',
        eager: true,
    })
    lobby: Lobby

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @Expose({ groups: ['wsLobby'] })
    @Type(() => LobbyUserStats)
    stats: LobbyUserStats
}
