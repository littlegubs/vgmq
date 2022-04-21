import { Music } from './music'
import { Game } from './game'
import { GameToMusic } from './game-to-music'

export interface LobbyMusic<T = GameToMusic[]> {
  id: string
  music: Music
  expectedAnswer?: Game<T>
  startAt: number
}
