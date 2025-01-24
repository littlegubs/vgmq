import { LobbyUser } from './lobby-user'
import { LobbyMusic } from './lobby-music'
import { Collection } from './collection'

export enum LobbyStatuses {
  Waiting = 'waiting',
  Playing = 'playing',
  Loading = 'loading',
  Buffering = 'buffering',
  PlayingMusic = 'playing_music',
  AnswerReveal = 'answer_reveal',
  FinalStanding = 'final_standing',
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
  allowCollection: boolean
  collectionFilters?: LobbyCollectionFilter[]
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
  allowCollection: boolean
  collectionFilters: {
    id: number
    type: 'exclusion' | 'limitation'
    limitation: number
  }[]
}

export interface LobbyJoinResponse {
  role: string
  lobby: Lobby
  gameNames: string[]
}

export interface Message {
  username: string
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
  type: 'exclusion' | 'limitation'
  limitation: number
  collection: Collection
}
