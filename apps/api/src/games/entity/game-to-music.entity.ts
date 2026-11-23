import { Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import { LobbyMusic } from '../../lobbies/entities/lobby-music.entity'
import { User } from '../../users/user.entity'
import { GameAlbum } from './game-album.entity'
import { Game } from './game.entity'
import { MusicAccuracy } from './music-accuracy.entity'
import { Music } from './music.entity'

export enum GameToMusicType {
    Original = 'original',
    Reused = 'reused',
}

@Entity()
export class GameToMusic {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'enum', enum: GameToMusicType, default: GameToMusicType.Original })
    type: string

    @Column({ type: 'varchar', nullable: true })
    @Expose({ groups: ['lobby-answer-reveal'] })
    title: string | null

    @Column({ type: 'text', nullable: true })
    @Expose({ groups: ['lobby-answer-reveal'] })
    artist: string | null

    @Column({ type: 'int', nullable: true })
    track: number | null

    @Column({ type: 'int', nullable: true })
    disk: number | null

    @Column({ default: false })
    deleted: boolean

    @ManyToOne(() => Game, (game) => game.musics)
    @Expose({ groups: ['lobby-answer-reveal'] })
    game: Game

    @ManyToOne(() => GameAlbum, (album) => album.musics, { onDelete: 'SET NULL' })
    @Expose({ groups: ['lobby-answer-reveal'] })
    album: GameAlbum | null

    @ManyToOne(() => Music, (music) => music.games, {
        cascade: ['insert', 'update'],
        eager: true,
    })
    @Expose({ groups: ['lobby-answer-reveal'] })
    music: Music

    @ManyToOne(() => GameToMusic, (gameToMusic) => gameToMusic.derivedGameToMusics, {
        cascade: ['insert', 'update'],
    })
    originalGameToMusic: GameToMusic | null

    @OneToMany(() => GameToMusic, (gameToMusic) => gameToMusic.originalGameToMusic)
    derivedGameToMusics?: GameToMusic[]

    @Column({ type: 'float', nullable: true })
    guessAccuracy: number | null

    @Column({ type: 'integer', default: 0 })
    playNumber = 0

    @OneToMany(() => LobbyMusic, (lobbyMusic) => lobbyMusic.gameToMusic)
    lobbyMusics: LobbyMusic[]

    @OneToMany(() => MusicAccuracy, (musicAccuracy) => musicAccuracy.gameToMusic)
    musicAccuracies: MusicAccuracy[]

    @ManyToOne(() => User)
    addedBy?: User

    @ManyToOne(() => User)
    updatedBy?: User

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
