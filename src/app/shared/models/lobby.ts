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

export type Lobby =  {
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

  // isWaiting = (): boolean => {
  //   return [LobbyStatuses.Waiting.toString(), LobbyStatuses.Loading.toString()].includes(this.status)
  // }
  //
  // isPLaying = (): boolean => {
  //   return [
  //     LobbyStatuses.AnswerReveal.toString(),
  //     LobbyStatuses.Playing.toString(),
  //     LobbyStatuses.PlayingMusic.toString(),
  //   ].includes(this.status)
  // }
  //
  // isFinalStanding = (): boolean => {
  //   return this.status === LobbyStatuses.FinalStanding
  // }
}

export interface LobbyJoinResponse {
  role: string
  lobby: Lobby
  gameNames: string[]
}
