import { Cover } from './cover'
import { AlternativeName } from './alternative-name'
import { GameToMusic } from './game-to-music'
import { Platform } from './platform'

export interface Game {
  id?: number
  category?: GameCategory
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
  url: string
  platforms?: Platform[]
}

export interface GameApiResponse {
  count: number
  data: Game[]
}

export interface GameMusicUploadErrorResponse {
  errors: string[]
}

export enum GameCategory {
  MainGame = 0,
  Port = 11,
}

export enum GameSearchSortBy {
  NameAsc = 'name_asc',
  NameDesc = 'name_desc',
  CountUsersAsc = 'count_user_asc',
  CountUsersDesc = 'count_user_desc',
  CountMusicsAsc = 'count_music_asc',
  CountMusicsDesc = 'count_music_desc',
}
