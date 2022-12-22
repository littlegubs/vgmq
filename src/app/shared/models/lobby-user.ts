import { User } from './user'

export enum LobbyUserRoles {
  Host = 'host',
  Player = 'player',
  Spectator = 'spectator',
}

export enum LobbyUserStatus {
  Buffering = 'buffering',
  ReadyToPlayMusic = 'ready_to_play_music',
}

export type LobbyUser = {
  user: User
  role: LobbyUserRoles
  answer?: string
  correctAnswer: boolean | null
  status?: LobbyUserStatus
  points: number
  musicGuessedRight: number
  disconnected: boolean
  rank: number
  playedTheGame: boolean | null
  me: boolean
  hintMode: boolean
  keepHintMode: boolean
}
