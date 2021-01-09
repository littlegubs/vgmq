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

export class LobbyUser {
  user: User
  role: string
  answer?: string
  answered: boolean
  status?: string
  points: number
  disconnected: boolean
  rank: number

  constructor(json: any) {
    this.role = json.role
    this.answer = json.answer
    this.answered = json.answered
    this.status = json.status
    this.points = json.points
    this.disconnected = json.disconnected
    this.user = new User(json.user)
  }
}
