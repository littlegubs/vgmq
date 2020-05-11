export class RegistrationForm {
  username: string
  email: string
  password: string
}

export class RegistrationFormApiErrorResponse {
  errors: RegistrationFormApiError[]

  constructor(errorRes) {
    this.errors = errorRes.errors?.map((error) => new RegistrationFormApiError(error))
  }
}

export class RegistrationFormApiError {
  field: string
  message: string

  constructor(error) {
    this.field = error.field
    this.message = error.message
  }
}
