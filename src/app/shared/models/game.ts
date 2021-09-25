import { Cover } from './cover'
import { AlternativeName } from './alternative-name'
import { GameMusic } from './game-music'

export interface Game {
  id?: number
  firstReleaseDate?: Date
  name: string
  slug?: string
  alternativeNames?: AlternativeName[]
  musics?: GameMusic[]
  cover: Cover
  enabled?: boolean
}

export interface GameApiResponse {
  count: number
  data: Game[]
}

export interface GameMusicUploadErrorResponse {
  errors: string[]
}
