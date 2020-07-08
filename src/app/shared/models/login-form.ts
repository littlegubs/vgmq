export class LoginForm {
  username: string
  password: string
}

export class LoginFormErrorResponse {
  message: string

  constructor(errorResponse: any) {
    this.message = errorResponse.message
  }
}
