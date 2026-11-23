import { GameAlbum } from '../entity/game-album.entity'

export class GameToMusicEditDto {
    title: string

    artist: string

    track: number

    disk: number

    album: GameAlbum | null
}
