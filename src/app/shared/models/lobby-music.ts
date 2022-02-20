import { Music } from './music'
import { Game } from './game'

export interface LobbyMusic {
  id: string
  music: Music
  expectedAnswer?: Game
  startAt: number
}
