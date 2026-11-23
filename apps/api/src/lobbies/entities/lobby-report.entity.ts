import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm'
import { User } from '../../users/user.entity'

export enum ReportStatus {
    Pending = 'pending',
    Banned = 'banned',
    Denied = 'denied',
}

@Entity()
export class LobbyReport {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    reporter: User

    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    reported: User

    @Column()
    lobbyId: number

    @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.Pending })
    status: ReportStatus

    @ManyToOne(() => User, { eager: true, nullable: true, onDelete: 'SET NULL' })
    updatedBy: User

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
