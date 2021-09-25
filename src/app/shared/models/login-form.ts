export class LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}
