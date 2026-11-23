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
export class AlternativeName {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    igdbId: number

    @Column()
    name: string

    @Column({ default: false })
    enabled: boolean

    @ManyToOne(() => Game, (game) => game.alternativeNames, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    game: Game

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
