import { Cover } from './cover'
import { AlternativeName } from './alternative-name'
import { GameToMusic } from './game-to-music'

export interface Game<MusicType = GameToMusic[]> {
  id?: number
  firstReleaseDate?: Date
  name: string
  slug?: string
  alternativeNames?: AlternativeName[]
  musics?: MusicType
  cover: Cover | null
  enabled?: boolean
  selectedByUser: boolean
  users: number
}

export interface GameApiResponse<MusicType = GameToMusic[]> {
  count: number
  data: Game<MusicType>[]
}

export interface GameMusicUploadErrorResponse {
  errors: string[]
}
