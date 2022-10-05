import { GameToMusic } from './game-to-music'

export interface LobbyMusic {
  id: string
  gameToMusic: GameToMusic
  startAt: number
  contributeToMissingData: boolean
  musicFinishesIn: number
}
