export class JwtPayload {
  exp: number
  iat: number
  roles: string[]
  username: string
  IGDBUsername: string

  constructor(json) {
    Object.assign(this, json)
  }
}
