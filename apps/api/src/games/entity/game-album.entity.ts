import {
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Entity,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'

import { File } from '../../entity/file.entity'
import { User } from '../../users/user.entity'
import { GameToMusic } from './game-to-music.entity'
import { Game } from './game.entity'

@Entity()
export class GameAlbum {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => File, { eager: true, cascade: true, onDelete: 'SET NULL' })
    @JoinColumn()
    cover?: File

    @Column()
    date: string

    @ManyToOne(() => Game, (game) => game.albums)
    game: Game

    @OneToMany(() => GameToMusic, (gameToMusic) => gameToMusic.album)
    musics: GameToMusic[]

    @ManyToOne(() => User)
    createdBy?: User

    @ManyToOne(() => User)
    updatedBy?: User

    @ManyToOne(() => User)
    validatedBy?: User

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
