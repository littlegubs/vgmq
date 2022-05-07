export class LoginForm {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}
