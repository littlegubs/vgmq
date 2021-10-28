export interface ApiErrorInterface {
  statusCode: number
  message: string | FormApiError[]
  error: string
}

export interface FormApiError {
  property: string
  errors: string[]
}
