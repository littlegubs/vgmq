import { LobbyUser } from './lobby-user'

export enum LobbyStatus {
  Waiting = 'waiting',
  Playing = 'playing',
  Loading = 'loading',
}

export class Lobby {
  name: string
  code: string
  password?: string
  hasPassword: boolean
  status: string
  countMusics: number
  users: LobbyUser[]

  constructor(json: any) {
    this.name = json.name
    this.code = json.code
    this.password = json.password
    this.hasPassword = json.hasPassword
    this.status = json.status
    this.countMusics = json.countMusics
    this.users = json.users?.map((user: LobbyUser) => new LobbyUser(user))
  }
}

export class LobbyJoinResponse {
  role: string
  lobby: Lobby

  constructor(json: any) {
    this.role = json.role
    this.lobby = new Lobby(json.lobby)
  }
}
