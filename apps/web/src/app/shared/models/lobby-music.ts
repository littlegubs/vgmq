import { GameToMusic } from './game-to-music'
import { Video } from './video'
import { Screenshot } from './screenshot'

export interface LobbyMusic {
  id: string
  gameToMusic: GameToMusic
  startAt: number
  contributeToMissingData: boolean
  musicFinishesIn: number
  video: Video | null
  startVideoAt: number
  screenshots: Screenshot[]
}
