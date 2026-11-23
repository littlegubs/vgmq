import { Expose } from 'class-transformer'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { GameToMusic } from '../../games/entity/game-to-music.entity'
import { Game } from '../../games/entity/game.entity'
import { Screenshot } from '../../games/entity/screenshot.entity'
import { Video } from '../../games/entity/video.entity'
import { Lobby } from './lobby.entity'

@Entity()
export class LobbyMusic {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    position = 0

    @Column({ type: 'float' })
    startAt = 0

    @Column({ type: 'float' })
    endAt = 0

    @Column({ type: 'boolean' })
    loaded = false

    @Column({ type: 'varchar', nullable: true })
    clipPath: string | null = null

    @Column({ type: 'boolean' })
    @Expose({ groups: ['lobby-answer-reveal'] })
    contributeToMissingData = false

    @ManyToOne(() => Lobby, (lobby) => lobby.lobbyMusics)
    lobby: Lobby

    @ManyToOne(() => GameToMusic, (gameToMusic) => gameToMusic.lobbyMusics, {
        onDelete: 'CASCADE',
    })
    @Expose({ groups: ['lobby-answer-reveal'] })
    gameToMusic: GameToMusic

    @ManyToMany(() => Game, { onDelete: 'CASCADE' })
    @JoinTable()
    expectedAnswers: Game[]

    @Column({ type: 'datetime', nullable: true, precision: 3 })
    musicStartedPlayingAt: Date

    @Column({ type: 'datetime', nullable: true, precision: 3 })
    musicFinishPlayingAt: Date

    @ManyToMany(() => Game, { onDelete: 'CASCADE' })
    @JoinTable()
    hintModeGames: Game[]

    @ManyToOne(() => Video)
    @Expose({ groups: ['lobby-answer-reveal'] })
    video: Video | null

    @Column({ type: 'int' })
    @Expose({ groups: ['lobby-answer-reveal'] })
    startVideoAt = 0

    @ManyToMany(() => Screenshot)
    @JoinTable({ name: 'lobby_music_screenshots' })
    @Expose({ groups: ['lobby-answer-reveal'] })
    screenshots: Screenshot[]

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
