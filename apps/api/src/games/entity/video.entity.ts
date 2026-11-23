import { Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm'

import { Game } from './game.entity'

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    igdbId: number

    @Column()
    @Expose({ groups: ['lobby-answer-reveal'] })
    videoId: string

    @Column()
    duration: string

    @ManyToOne(() => Game, (game) => game.videos)
    game: Game

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
