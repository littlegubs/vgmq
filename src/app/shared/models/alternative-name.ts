export class AlternativeName {
  id: number
  name: string
  enabled: boolean

  constructor(json) {
    Object.assign(this, json)
  }
}
