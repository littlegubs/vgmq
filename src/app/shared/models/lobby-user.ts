import { User } from './user'

export enum LobbyUserRoles {
  Host = 'host',
  Player = 'player',
  Spectator = 'spectator',
}

export class LobbyUser {
  user: User
  role: string

  constructor(json: any) {
    this.role = json.role
    this.user = new User(json.user)
  }
}
