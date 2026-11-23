import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm'

import { User } from '../../users/user.entity'
import { GameToMusic } from './game-to-music.entity'

@Entity()
export class MusicAccuracy {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'boolean' })
    correctAnswer: boolean

    @Column({ type: 'boolean' })
    playedTheGame: boolean

    @Column({ type: 'boolean' })
    hintMode: boolean

    @ManyToOne(() => GameToMusic, (gameToMusic) => gameToMusic.musicAccuracies, {
        onDelete: 'CASCADE',
    })
    gameToMusic: GameToMusic

    @ManyToOne(() => User)
    user: User

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
