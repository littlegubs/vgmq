import { Cover } from './cover'
import { AlternativeName } from './alternative-name'
import { GameToMusic } from './game-to-music'

export interface Game {
  id?: number
  firstReleaseDate?: Date
  name: string
  slug?: string
  alternativeNames?: AlternativeName[]
  musics?: GameToMusic[]
  countMusics?: number
  countUsers?: number
  cover: Cover | null
  enabled?: boolean
  selectedByUser: boolean
  users: number
}

export interface GameApiResponse {
  count: number
  data: Game[]
}

export interface GameMusicUploadErrorResponse {
  errors: string[]
}
