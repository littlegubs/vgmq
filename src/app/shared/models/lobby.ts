import { LobbyUser } from './lobby-user'
import { LobbyMusic } from './lobby-music'

export enum LobbyStatuses {
  Waiting = 'waiting',
  Playing = 'playing',
  Loading = 'loading',
  PlayingMusic = 'playing_music',
  AnswerReveal = 'answer_reveal',
}

export class Lobby {
  name: string
  code: string
  password?: string
  hasPassword: boolean
  status: string
  countMusics: number
  guessTime: number
  musicNumber: number
  allowDuplicates: boolean
  users: LobbyUser[]
  currentMusic?: LobbyMusic

  constructor(json: any) {
    this.name = json.name
    this.code = json.code
    this.password = json.password
    this.hasPassword = json.hasPassword
    this.status = json.status
    this.countMusics = json.countMusics
    this.guessTime = json.guessTime
    this.musicNumber = json.musicNumber
    this.allowDuplicates = json.allowDuplicates
    this.users = json.users?.map((user: LobbyUser) => new LobbyUser(user))
    this.currentMusic = json.currentMusic ? new LobbyMusic(json.currentMusic) : undefined
  }

  isWaiting = (): boolean => {
    return [LobbyStatuses.Waiting.toString(), LobbyStatuses.Loading.toString()].includes(this.status)
  }

  isPLaying = (): boolean => {
    return [
      LobbyStatuses.AnswerReveal.toString(),
      LobbyStatuses.Playing.toString(),
      LobbyStatuses.PlayingMusic.toString(),
    ].includes(this.status)
  }
}

export class LobbyJoinResponse {
  role: string
  lobby: Lobby
  gameNames: string[]

  constructor(json: any) {
    this.role = json.role
    this.gameNames = json.gameNames
    this.lobby = new Lobby(json.lobby)
  }
}
