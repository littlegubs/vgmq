export class RegistrationForm {
  username: string
  email: string
  password: string
}

export class RegistrationFormApiErrors {
  errors: RegistrationFormApiError[]
}

export class RegistrationFormApiError {
  field: string
  message: string
}
