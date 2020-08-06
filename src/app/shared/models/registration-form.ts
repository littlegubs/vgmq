export class RegistrationForm {
  username: string
  email: string
  password: string
}

export class RegistrationFormApiErrorResponse {
  errors?: RegistrationFormApiError[]
  message?: string

  constructor(errorRes: any) {
    this.errors = errorRes.errors?.map((error: any) => new RegistrationFormApiError(error))
    this.message = errorRes.message
  }
}

export class RegistrationFormApiError {
  field: string
  message: string

  constructor(error: any) {
    this.field = error.field
    this.message = error.message
  }
}
