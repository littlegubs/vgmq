export interface JwtPayload {
  exp: number
  iat: number
  roles: string[]
  username: string
  IGDBUsername: string
}
