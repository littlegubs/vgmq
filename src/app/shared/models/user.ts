export class User {
  id: string
  username: string

  constructor(json: any) {
    this.username = json.username
  }
}
