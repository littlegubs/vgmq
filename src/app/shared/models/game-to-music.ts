import { Music } from './music'
import { Game } from './game'

export interface GameToMusic {
  id: number
  music: Music
  game?: Game
  originalGameToMusic?: GameToMusic
  derivedGameToMusics: GameToMusic[]
  guessAccuracy?: number | null
  playNumber?: number
}
