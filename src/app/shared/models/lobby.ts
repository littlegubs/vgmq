import { LobbyUser } from './lobby-user'
import { LobbyMusic } from './lobby-music'

export enum LobbyStatuses {
  Waiting = 'waiting',
  Playing = 'playing',
  Loading = 'loading',
  PlayingMusic = 'playing_music',
  AnswerReveal = 'answer_reveal',
  FinalStanding = 'final_standing',
}

export type Lobby = {
  name: string
  code: string
  password?: string
  hasPassword: boolean
  status: string
  guessTime: number
  musicNumber: number
  lobbyMusics: number
  currentLobbyMusicPosition: number | null
  allowDuplicates: boolean
  users: LobbyUser[]
  currentMusic?: LobbyMusic
}

export type LobbyConfig = {
  name: string
  password?: string
}

export interface LobbyJoinResponse {
  role: string
  lobby: Lobby
  gameNames: string[]
}
