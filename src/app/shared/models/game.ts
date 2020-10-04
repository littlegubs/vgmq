import { Cover } from './cover'
import { AlternativeName } from './alternative-name'
import { GameMusic } from './game-music'

export class Game {
  id?: number
  firstReleaseDate?: Date
  name: string
  slug?: string
  alternativeNames?: AlternativeName[]
  musics?: GameMusic[]
  cover: Cover
  enabled?: boolean

  constructor(json: any) {
    this.id = json.id
    this.firstReleaseDate = json.firstReleaseDate
    this.name = json.name
    this.slug = json.slug
    this.alternativeNames = json.alternativeNames?.map(
      (alternativeName: AlternativeName) => new AlternativeName(alternativeName)
    )
    this.musics = json.musics?.map((gameMusic: GameMusic) => new GameMusic(gameMusic))
    this.cover = new Cover(json.cover)
    this.enabled = json.enabled
  }
}

export class GameApiResponse {
  count: number
  data: Game[]
}

export class GameMusicUploadErrorResponse {
  errors: string[] = []

  constructor(json: any) {
    this.errors = json.errors
  }
}
