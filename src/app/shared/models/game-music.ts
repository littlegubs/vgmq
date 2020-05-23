import { Music } from './music'

export class GameMusic {
  id: number
  music: Music

  constructor(json) {
    this.id = json.id
    this.music = new Music(json.music)
  }
}
