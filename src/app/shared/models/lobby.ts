import { LobbyUser } from './lobby-user'
import { LobbyMusic } from './lobby-music'
import { Collection } from './collection'
import { Genre } from './genre'
import { Theme } from './theme'

export enum LobbyStatuses {
  Waiting = 'waiting',
  Playing = 'playing',
  Loading = 'loading',
  Buffering = 'buffering',
  PlayingMusic = 'playing_music',
  AnswerReveal = 'answer_reveal',
  Result = 'result',
}

export enum LobbyDifficulties {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum LobbyGameModes {
  Standard = 'standard',
  LocalCouch = 'local_couch',
}

export enum LobbyHintMode {
  Disabled = 'disabled',
  Allowed = 'allowed',
  Always = 'always',
}

export type Lobby = {
  name: string
  code: string
  password?: string
  hasPassword: boolean
  status: LobbyStatuses
  guessTime: number
  musicNumber: number
  playedMusics: number
  fillEmptyWithUnknownMusics: boolean
  lobbyMusics: number
  currentLobbyMusicPosition: number | null
  allowDuplicates: boolean
  customDifficulty: boolean
  minDifficulty: number
  maxDifficulty: number
  difficulty: Array<'easy' | 'medium' | 'hard'>
  lobbyUsers: LobbyUser[]
  currentMusic?: LobbyMusic
  allowContributeToMissingData: boolean
  gameMode: LobbyGameModes
  playMusicOnAnswerReveal: boolean
  showCorrectAnswersDuringGuessTime: boolean
  hintMode: LobbyHintMode
  custom: boolean
  premium: boolean
  filterByYear: boolean
  filterMinYear: number
  filterMaxYear: number
  allowCollectionAnswer: boolean
  limitAllCollectionsTo: number
  collectionFilters?: LobbyCollectionFilter[]
  genreFilters?: LobbyGenreFilter[]
  themeFilters?: LobbyThemeFilter[]
}

export type LobbyConfig = {
  name: string
  password?: string
  guessTime: number
  playedMusics: number
  musicNumber: number
  allowDuplicates: boolean
  difficulty: LobbyDifficulties[]
  allowContributeToMissingData: boolean
  gameMode: LobbyGameModes
  playMusicOnAnswerReveal: boolean
  showCorrectAnswersDuringGuessTime: boolean
  hintMode: LobbyHintMode
  filterByYear: boolean
  filterMinYear: number
  filterMaxYear: number
  allowCollectionAnswer: boolean
  limitAllCollectionsTo: number
  collectionFilters: {
    id: number
    type: FilterType
    limitation: number
  }[]
  genreFilters: {
    id: number
    type: FilterType
    limitation: number
  }[]
  themeFilters: {
    id: number
    type: FilterType
    limitation: number
  }[]
}

export interface LobbyJoinResponse {
  role: string
  lobby: Lobby
  gameNames: string[]
}

export interface Message {
  username: string | null
  message: string
}

export interface LobbyInfo {
  userIsPremium: boolean
  filterMaxYear: number
  filterMinYear: number
  musicAccuracyRatio: number
}

export interface LobbyCollectionFilter {
  id: number
  type: FilterType
  limitation: number
  collection: Collection
}

export interface LobbyGenreFilter {
  id: number
  type: FilterType
  limitation: number
  genre: Genre
}

export interface LobbyThemeFilter {
  id: number
  type: FilterType
  limitation: number
  theme: Theme
}

export type FilterType = 'exclusion' | 'limitation' | 'inclusion'
