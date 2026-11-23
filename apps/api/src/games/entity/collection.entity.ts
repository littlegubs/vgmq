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
export class Collection {
    @Expose({ groups: ['lobby'] })
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    igdbId: number

    @Expose({ groups: ['lobby-answer-reveal', 'game-list', 'lobby'] })
    @Column()
    name: string

    @Column()
    slug: string

    @ManyToMany(() => Game, (game) => game.collections)
    games: Game[]

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
