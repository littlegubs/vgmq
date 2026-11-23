import { GameToMusic } from './game-to-music'
import { Game } from './game'

export interface GameAlbumCover {
  path: string
}

export interface GameAlbum {
  id: number
  name: string
  date: string
  musics: GameToMusic[]
  game: Game
  cover: GameAlbumCover | null

  // used for editing
  disks?: { number: number; data: GameToMusic[] }[]
  musicsWithNoDisk: GameToMusic[]
}
