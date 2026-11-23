import { Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm'

import { Cover } from './cover.entity'

@Entity()
export class ColorPalette {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    vibrantHex: string

    @Column()
    mutedHex: string

    @Column()
    darkMutedHex: string

    @Column()
    darkVibrantHex: string

    @Column()
    lightMutedHex: string

    @Column()
    lightVibrantHex: string

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @Column()
    backgroundColorHex: string

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @Column()
    colorHex: string

    @OneToOne(() => Cover, (cover) => cover.colorPalette)
    cover: Cover

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
