import { Music } from './music'
import { Game } from './game'

export class LobbyMusic {
  music: Music
  expectedAnswer?: Game
  startAt: number

  constructor(json: any) {
    this.music = new Music(json.music)
    this.expectedAnswer = json.expectedAnswer ? new Game(json.expectedAnswer) : null
    this.startAt = json.startAt
  }
}
