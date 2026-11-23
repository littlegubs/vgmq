export class RegistrationForm {
  username: string
  email: string
  password: string
}

export interface RegisterResponse {
  accessToken: string
  refreshToken: string
}
