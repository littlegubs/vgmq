import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { User } from '../../users/user.entity'
import { Expose } from 'class-transformer'

@Entity()
export class OauthPatreon {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    patreonUserId: string

    @Column({ type: 'varchar' })
    accessToken: string

    @Column()
    refreshToken: string

    @Column({ type: 'int', default: 0 })
    campaignLifetimeSupportCents: number

    @Column({ type: 'simple-array' })
    currentlyEntitledTiers: string[]

    @OneToOne(() => User, (user) => user.patreonAccount, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
