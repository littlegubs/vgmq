import { User } from './user'

export enum LobbyUserRoles {
  Host = 'host',
  Player = 'player',
  Spectator = 'spectator',
}

export class LobbyUser {
  user: User
  role: string
  answer?: string
  answered: boolean

  constructor(json: any) {
    this.role = json.role
    this.answer = json.answer
    this.answered = json.answered
    this.user = new User(json.user)
  }
}
