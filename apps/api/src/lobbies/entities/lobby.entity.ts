import { Exclude, Expose, Transform } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm'

import { LobbyCollectionFilter } from './lobby-collection-filter.entity'
import { LobbyGenreFilter } from './lobby-genre-filter.entity'
import { LobbyMusic } from './lobby-music.entity'
import { LobbyThemeFilter } from './lobby-theme-filter.entity'
import { LobbyUser } from './lobby-user.entity'
import { User } from '../../users/user.entity'

export enum LobbyStatuses {
    Waiting = 'waiting',
    Loading = 'loading',
    Playing = 'playing',
    Buffering = 'buffering',
    PlayingMusic = 'playing_music',
    AnswerReveal = 'answer_reveal',
    Result = 'result',
}

export enum LobbyDifficulties {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
}

export enum LobbyHintMode {
    Disabled = 'disabled',
    Allowed = 'allowed',
    Always = 'always',
}

export enum LobbyGameModes {
    Standard = 'standard',
    LocalCouch = 'local_couch',
}

@Entity()
export class Lobby {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number

    @Expose({ groups: ['lobby', 'lobby-list'] })
    @Column({ unique: true })
    code: string

    @Column()
    @Expose({ groups: ['lobby', 'lobby-list'] })
    name: string

    @Column({ type: 'varchar', nullable: true })
    @Expose({ groups: ['lobby'] })
    password: string | null

    @Column({
        type: 'enum',
        enum: LobbyStatuses,
        default: LobbyStatuses.Waiting,
    })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    status: string

    @Column({ type: 'int', default: 20 })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    guessTime: number

    @Column({ type: 'int', default: 20 })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    musicNumber: number

    @Column({ default: false })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    allowDuplicates: boolean

    @Column({ default: true })
    @Expose({ groups: ['lobby'] })
    playMusicOnAnswerReveal: boolean

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    customDifficulty = false

    @Column({ type: 'int', default: 0 })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    minDifficulty: number

    @Column({ type: 'int', default: 100 })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    maxDifficulty: number

    @Column({ type: 'boolean', default: true })
    @Expose({ groups: ['lobby'] })
    allowContributeToMissingData = true

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['lobby'] })
    showCorrectAnswersDuringGuessTime = false

    /**
     * lobby can be an official or custom one
     */
    @Column({ type: 'boolean', default: true })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    custom = true

    /**
     * Number of loops without user
     * Only used in infinite lobbies
     */
    @Column({ type: 'int', default: 0 })
    loopsWithNoUsers: number

    /**
     * Defines the number of music known by the users in lobby
     */
    @Column({ type: 'int', default: 20 })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    playedMusics: number

    @Column({
        type: 'set',
        enum: LobbyDifficulties,
        default: [LobbyDifficulties.Easy, LobbyDifficulties.Medium, LobbyDifficulties.Hard],
    })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    difficulty: string[]

    @Column({
        type: 'enum',
        enum: LobbyGameModes,
        default: LobbyGameModes.Standard,
    })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    gameMode: string

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    premium = false

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['lobby'] })
    filterByYear = false

    @Column({ type: 'int' })
    @Expose({ groups: ['lobby'] })
    filterMinYear: number

    @Column({ type: 'int' })
    @Expose({ groups: ['lobby'] })
    filterMaxYear: number

    @Column({ type: 'boolean', default: false })
    @Expose({ groups: ['lobby'] })
    allowCollectionAnswer = false

    @Column({ type: 'int', default: 0 })
    @Expose({ groups: ['lobby'] })
    limitAllCollectionsTo = 0

    @Column({ type: 'boolean', default: true })
    @Expose({ groups: ['lobby'] })
    allowVoteSkipGuessing = true

    @Column({ type: 'boolean', default: true })
    @Expose({ groups: ['lobby'] })
    allowVoteSkipAnswerReveal = true

    @Column({ type: 'int', default: 0 })
    @Expose({ groups: ['lobby'] })
    voteSkip = 0

    @Column({ default: false })
    @Expose({ groups: ['lobby'] })
    isPaused: boolean

    @Column({ type: 'varchar', nullable: true })
    pausedJobName: string | null // e.g., 'playMusic' or 'bufferMusic'

    @Column({ type: 'int', nullable: true })
    pausedJobRemainingDelay: number | null // e.g., 3000 (milliseconds)

    @Column({
        type: 'enum',
        enum: LobbyHintMode,
        default: LobbyHintMode.Allowed,
    })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    hintMode: LobbyHintMode

    @Transform(({ value }) => value?.length)
    @OneToMany(() => LobbyMusic, (lobbyMusic) => lobbyMusic.lobby)
    @Expose({ groups: ['lobby', 'lobby-list'] })
    lobbyMusics: LobbyMusic[]

    @Column({ type: 'int', nullable: true })
    @Expose({ groups: ['lobby', 'lobby-list'] })
    currentLobbyMusicPosition: number | null

    @Transform(({ value }: { value: LobbyUser[] }) => value?.length)
    @Expose({ groups: ['lobby-list'] })
    @OneToMany(() => LobbyUser, (lobbyUser) => lobbyUser.lobby)
    lobbyUsers: LobbyUser[]

    @Expose({ groups: ['lobby'] })
    @ManyToMany(() => LobbyCollectionFilter, {
        cascade: ['insert', 'remove'],
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({ name: 'lobby_lobby_collection_filters' })
    collectionFilters: LobbyCollectionFilter[]

    @Expose({ groups: ['lobby'] })
    @ManyToMany(() => LobbyGenreFilter, {
        cascade: ['insert', 'remove'],
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({ name: 'lobby_lobby_genre_filters' })
    genreFilters: LobbyGenreFilter[]

    @Expose({ groups: ['lobby'] })
    @ManyToMany(() => LobbyThemeFilter, {
        cascade: ['insert', 'remove'],
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({ name: 'lobby_lobby_theme_filters' })
    themeFilters: LobbyThemeFilter[]

    @ManyToMany(() => User)
    @JoinTable({ name: 'lobby_banned_users' })
    bannedUsers: User[]

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @Expose({ groups: ['lobby', 'lobby-list'] })
    get hasPassword(): boolean {
        return this.password !== null
    }
}
