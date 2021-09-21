export class RegistrationForm {
  username: string
  email: string
  password: string
}

export interface RegisterResponse {
  access_token: string
  refresh_token: string
}
