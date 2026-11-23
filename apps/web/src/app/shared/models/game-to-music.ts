import { Music } from './music'
import { Game } from './game'

export interface GameToMusic {
  id: number
  title: string | null
  artist: string | null
  music: Music
  game?: Game
  disk: number | null
  track: number | null
  type: GameToMusicType
  originalGameToMusic?: GameToMusic
  derivedGameToMusics: GameToMusic[]
  guessAccuracy?: number | null
  playNumber?: number
  album: { id: number } | null
}

export enum GameToMusicType {
  Original = 'original',
  Reused = 'reused',
}
