import { Game } from './game'
import { GameToMusic } from './game-to-music'

export interface LobbyMusic {
  id: string
  gameToMusic: GameToMusic
  expectedAnswer?: Game
  startAt: number
  contributeToMissingData: boolean
  musicFinishesIn: number
}
