import { Music } from './music'
import { Game } from './game'

export interface LobbyMusic {
  music: Music
  expectedAnswer?: Game
  startAt: number
}
