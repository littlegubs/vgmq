import * as bcrypt from 'bcrypt'
import { Exclude, Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm'

import { Game } from '../games/entity/game.entity'
import { LobbyUser } from '../lobbies/entities/lobby-user.entity'
import { OauthPatreon } from '../oauth/entities/oauth-patreon.entity'
import { Role } from './role.enum'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Expose({ groups: ['wsLobby'] })
    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true, type: 'varchar' })
    @Exclude()
    password: string | null

    @Column({
        type: 'set',
        enum: Role,
        default: [Role.User],
    })
    roles: string[]

    @Column({ default: false })
    enabled: boolean

    @Column({ type: 'varchar', length: 40, nullable: true })
    confirmationToken: string | null

    @Column({ type: 'varchar', nullable: true })
    currentHashedRefreshToken?: string | null

    @Column({ type: 'varchar', nullable: true })
    resetPasswordToken: string | null

    @Column({ type: 'varchar', nullable: true })
    banReason: string | null

    @Expose({ groups: ['wsLobby', 'userProfile'] })
    @Column({ type: 'boolean', default: false })
    premium = false

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'bannedById' })
    bannedBy?: User | null

    @Column({ type: 'datetime', nullable: true })
    resetPasswordTokenCreatedAt: Date | null

    @ManyToMany(() => Game, (game) => game.users)
    @JoinTable({ name: 'user_games' })
    games: Game[]

    @OneToOne(() => LobbyUser, (lobbyUser) => lobbyUser.user, { onDelete: 'SET NULL' })
    currentLobby?: LobbyUser

    @OneToOne(() => OauthPatreon, (oauthPatreon) => oauthPatreon.user, {
        onDelete: 'SET NULL',
        eager: true,
    })
    @Expose({ groups: ['wsLobby'] })
    patreonAccount?: OauthPatreon

    @Column({ nullable: true, type: 'datetime' })
    usernameUpdatedAt: Date | null

    @Column({ nullable: true, type: 'datetime' })
    premiumCachedAt: Date | null

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert() async hashPassword(): Promise<void> {
        this.password = this.password ? await bcrypt.hash(this.password, 8) : null
    }

    async validatePassword(password: string): Promise<boolean> {
        return this.password ? bcrypt.compare(password, this.password) : false
    }
}
