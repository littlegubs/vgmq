import { Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm'

import { Game } from './game.entity'

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    igdbId: number

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @Column()
    abbreviation: string

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @Column()
    name: string

    @ManyToMany(() => Game, (game) => game.platforms)
    games: Game[]

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
