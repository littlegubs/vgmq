export class Cover {
  imageId: string

  constructor(json: unknown) {
    Object.assign(this, json)
  }
}
