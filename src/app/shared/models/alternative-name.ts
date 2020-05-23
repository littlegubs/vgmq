export class AlternativeName {
  name: string
  enabled: boolean

  constructor(json) {
    Object.assign(this, json)
  }
}
