import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import { User } from '../../users/user.entity'

@Entity()
export class LobbyMessage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    user: User

    @Column()
    lobbyId: number

    @Column()
    @CreateDateColumn()
    createdAt: Date
}
