import { LobbyUser } from './lobby-user'

export class Lobby {
  name: string
  code: string
  password?: string
  hasPassword: boolean
  lobbyUsers: LobbyUser[]

  constructor(json: any) {
    this.name = json.name
    this.code = json.code
    this.password = json.password
    this.hasPassword = json.hasPassword
    this.lobbyUsers = json.lobbyUsers?.map((lobbyUser: LobbyUser) => new LobbyUser(lobbyUser))
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
