import { Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm'

import { File } from '../../entity/file.entity'
import { GameToMusic } from './game-to-music.entity'

@Entity()
export class Music {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Expose({ groups: ['lobby-answer-reveal'] })
    title: string

    @Column({ nullable: true, type: 'text' })
    @Expose({ groups: ['lobby-answer-reveal'] })
    artist: string

    @Column({ type: 'float' })
    duration: number

    @Column({ type: 'int', nullable: true })
    track: number | null

    @Column({ type: 'int', nullable: true })
    disk: number | null

    @OneToMany(() => GameToMusic, (gameToMusic) => gameToMusic.music)
    games: GameToMusic[]

    @OneToOne(() => File, { eager: true, cascade: true })
    @JoinColumn()
    file: File

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
