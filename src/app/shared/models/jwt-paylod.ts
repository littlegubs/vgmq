export class JwtPaylod {
  exp: number
  iat: number
  roles: string[]
  username: string

  constructor(json) {
    Object.assign(this, json)
  }
}
