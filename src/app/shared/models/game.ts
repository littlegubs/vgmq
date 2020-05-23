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

  constructor(json) {
    this.id = json.id
    this.firstReleaseDate = json.firstReleaseDate
    this.name = json.name
    this.slug = json.slug
    this.alternativeNames = json.alternativeNames?.map((alternativeName) => new AlternativeName(alternativeName))
    this.gameMusics = json.gameMusics?.map((gameMusic) => new GameMusic(gameMusic))
    this.cover = new Cover(json.cover)
  }
}

export class GameApiResponse {
  data: Game[]
}

export class GameMusicUploadErrorResponse {
  errors: string[] = []

  constructor(json) {
    this.errors = json.errors
  }
}
