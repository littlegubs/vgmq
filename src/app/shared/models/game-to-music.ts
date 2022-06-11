import { Music } from './music'
import { Game } from './game'

export interface GameToMusic {
  id: number
  music: Music
  game?: Game
  guessAccuracy?: number | null
  playNumber?: number
}
