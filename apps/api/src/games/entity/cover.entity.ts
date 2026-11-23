import { Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'

import { ColorPalette } from './color-palette.entity'
import { Game } from './game.entity'

@Entity()
export class Cover {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    igdbId: number

    @Column()
    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    imageId: string

    @OneToOne(() => Game, (game) => game.cover, { onDelete: 'CASCADE' })
    game: Game

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @OneToOne(() => ColorPalette, (colorPalette) => colorPalette.cover, {
        cascade: ['insert', 'remove'],
    })
    @JoinColumn()
    colorPalette: ColorPalette

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
