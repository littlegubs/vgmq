import { Expose } from 'class-transformer'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    ManyToMany,
    JoinColumn,
    ManyToOne,
    JoinTable,
} from 'typeorm'

import { User } from '../../users/user.entity'
import { AlternativeName } from './alternative-name.entity'
import { Collection } from './collection.entity'
import { Cover } from './cover.entity'
import { GameAlbum } from './game-album.entity'
import { GameToMusic } from './game-to-music.entity'
import { Genre } from './genre.entity'
import { Platform } from './platform.entity'
import { Screenshot } from './screenshot.entity'
import { Theme } from './theme.entity'
import { Video } from './video.entity'
import { GameType } from './game-type.entity'

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    igdbId: number

    @Column({ type: 'date', nullable: true })
    firstReleaseDate: Date | null

    @Column()
    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    name: string

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @Column()
    slug: string

    @Column()
    url: string

    @Column({ default: false })
    nsfw: boolean

    @ManyToOne(() => User)
    addedBy?: User

    @ManyToOne(() => User, { eager: true })
    updatedBy?: User

    @Column({ default: true })
    enabled: boolean

    platformIds: number[]

    @OneToMany(() => AlternativeName, (alternativeName) => alternativeName.game, {
        cascade: true,
    })
    alternativeNames: AlternativeName[]

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @OneToOne(() => Cover, (cover) => cover.game, {
        cascade: true,
        onDelete: 'SET NULL',
        eager: true,
    })
    @JoinColumn()
    cover?: Cover | null

    @ManyToMany(() => User, (user) => user.games)
    users: User[]

    @ManyToOne(() => GameType, { cascade: ['insert'] })
    type: GameType

    countUsers: number

    selectedByUser = false

    @ManyToOne(() => Game, (game) => game.children, {
        onDelete: 'SET NULL',
        cascade: true,
    })
    parent?: Game

    @OneToMany(() => Game, (game) => game.parent)
    children: Game[]

    @ManyToOne(() => Game, {
        onDelete: 'SET NULL',
        cascade: true,
    })
    versionParent?: Game

    // @OneToMany(() => GameRevision, (revision) => revision.game)
    // revisions: Game[]

    @OneToMany(() => GameAlbum, (gameAlbum) => gameAlbum.game)
    albums: GameAlbum[]

    @OneToMany(() => GameToMusic, (gameToMusic) => gameToMusic.game)
    musics: GameToMusic[]

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @ManyToMany(() => Platform, (platform) => platform.games, {
        cascade: ['insert', 'update'],
    })
    @JoinTable({ name: 'games_platforms' })
    platforms: Platform[]

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @ManyToMany(() => Genre, (genre) => genre.games, {
        cascade: ['insert', 'update'],
    })
    @JoinTable({ name: 'games_genres' })
    genres: Genre[]

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @ManyToMany(() => Theme, (theme) => theme.games, {
        cascade: ['insert', 'update'],
    })
    @JoinTable({ name: 'games_themes' })
    themes: Theme[]

    @Expose({ groups: ['lobby-answer-reveal', 'game-list'] })
    @ManyToMany(() => Collection, (collection) => collection.games, {
        cascade: ['insert', 'update'],
    })
    @JoinTable({ name: 'games_collections' })
    collections: Collection[]

    @ManyToMany(() => Game, (game) => game.isSimilarTo, {
        cascade: ['insert', 'update'],
    })
    @JoinTable({ name: 'games_similar_games', inverseJoinColumn: { name: 'similarGameId' } })
    similarGames: Game[]

    @ManyToMany(() => Game, (game) => game.similarGames)
    isSimilarTo: Game[]

    @OneToMany(() => Video, (video) => video.game, {
        cascade: ['insert', 'update'],
    })
    videos: Video[]

    @OneToMany(() => Screenshot, (video) => video.game, {
        cascade: ['insert', 'update'],
    })
    screenshots: Screenshot[]

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
