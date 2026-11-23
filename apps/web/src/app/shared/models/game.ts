import { Cover } from './cover'
import { AlternativeName } from './alternative-name'
import { GameToMusic } from './game-to-music'
import { Platform } from './platform'
import { GameAlbum } from './game-album'
import { Collection } from './collection'
import { Theme } from './theme'
import { Genre } from './genre'

export interface Game {
  id?: number
  category?: GameCategory
  firstReleaseDate?: Date
  name: string
  slug?: string
  albums: GameAlbum[]
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
  collections: Collection[]
  themes: Theme[]
  genres: Genre[]
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

export interface GameAutocompleteResponse {
  highlight: string[] | undefined
  name: string | undefined
  type: 'game_name' | 'alternative_name' | 'collection_name'
}
