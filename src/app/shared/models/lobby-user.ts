import { User } from './user'

export enum LobbyUserRoles {
  Host = 'host',
  Player = 'player',
  Spectator = 'spectator',
}

export enum LobbyUserStatuses {
  CorrectAnswer = 'correct_answer',
  WrongAnswer = 'wrong_answer',
}

export type LobbyUser = {
  user: User
  role: LobbyUserRoles
  answer?: string
  correctAnswer: boolean | null
  status?: string
  points: number
  disconnected: boolean
  rank: number
}
