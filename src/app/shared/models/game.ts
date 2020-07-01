import { Cover } from './cover'
import { AlternativeName } from './alternative-name'
import { GameMusic } from './game-music'

export class Game {
  id: number
  firstReleaseDate: Date
  name: string
  slug: string
  alternativeNames: AlternativeName[]
  gameMusics: GameMusic[]
  cover: Cover
  enabled: boolean

  constructor(json) {
    this.id = json.id
    this.firstReleaseDate = json.firstReleaseDate
    this.name = json.name
    this.slug = json.slug
    this.alternativeNames = json.alternativeNames?.map((alternativeName) => new AlternativeName(alternativeName))
    this.gameMusics = json.gameMusics?.map((gameMusic) => new GameMusic(gameMusic))
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

  constructor(json) {
    this.errors = json.errors
  }
}
