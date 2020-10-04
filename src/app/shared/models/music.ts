export class Music {
  id?: number
  title?: string
  artist?: string
  duration?: number
  durationDate?: Date
  guessAccuracy?: number | null
  playNumber?: number
  awsUrl?: string

  constructor(json: any) {
    this.id = json.id
    this.title = json.title
    this.artist = json.artist
    if (json.duration) {
      this.duration = json.duration
      this.durationDate = new Date(0, 0, 0, 0, 0, this.duration)
    }
    this.guessAccuracy = json.guessAccuracy
    this.playNumber = json.playNumber
    this.awsUrl = json.awsUrl
  }
}

export class AdminMusicApiData {
  title: string
  artist: string
}

export class AdminMusicApiErrors {
  title: string[]
  artist: string[]

  constructor(json: any) {
    this.title = json.title
    this.artist = json.artist
  }
}
