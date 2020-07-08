import { Music } from './music'

export class GameMusic {
  id: number
  music: Music

  constructor(json: any) {
    this.id = json.id
    this.music = new Music(json.music)
  }
}
