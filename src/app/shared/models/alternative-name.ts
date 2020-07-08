export class AlternativeName {
  id: number
  name: string
  enabled: boolean

  constructor(json: unknown) {
    Object.assign(this, json)
  }
}
