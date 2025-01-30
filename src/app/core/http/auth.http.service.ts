import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { RegisterResponse, RegistrationForm } from '../../shared/models/registration-form'
import { LoginForm, LoginResponse } from '../../shared/models/login-form'
import { catchError } from 'rxjs/operators'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  test(): Observable<string> {
    return this.http.get(`${this.apiEndpoint}`, { responseType: 'text' })
  }

  register(data: RegistrationForm, recaptcha: string): Observable<null> {
    return this.http.post<null>(`${this.apiEndpoint}/auth/register`, { ...data, recaptcha }, { withCredentials: true })
  }

  confirm(token: string): Observable<RegisterResponse | null> {
    return this.http.get<RegisterResponse | null>(`${this.apiEndpoint}/auth/confirmation/${token}`)
  }

  login(data: LoginForm, recaptcha: string): Observable<LoginResponse | null> {
    return this.http
      .post<LoginResponse | null>(`${this.apiEndpoint}/auth/login`, { ...data, recaptcha })
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(httpErrorResponse.error as ApiErrorInterface)
        )
      )
  }

  requestResetPassword(data: { email: string }, recaptcha: string): Observable<LoginResponse | null> {
    return this.http
      .post<LoginResponse | null>(`${this.apiEndpoint}/auth/reset-password/request`, { ...data, recaptcha })
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(httpErrorResponse.error as ApiErrorInterface)
        )
      )
  }

  resetPassword(data: { password: string }, token: string, recaptcha: string): Observable<LoginResponse | null> {
    return this.http
      .post<LoginResponse | null>(`${this.apiEndpoint}/auth/reset-password/${token}`, { ...data, recaptcha })
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(httpErrorResponse.error as ApiErrorInterface)
        )
      )
  }

  logout(): Observable<null> {
    return this.http.get<null>(`${this.apiEndpoint}/auth/logout`)
  }

  limitedAccessAllowed(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiEndpoint}/limited-access/allowed`)
  }

  limitedAccessPassword(password: string, recaptcha: string): Observable<null | string> {
    return this.http
      .post<null | string>(`${this.apiEndpoint}/limited-access/password`, {
        password,
        recaptcha,
      })
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(httpErrorResponse.error as ApiErrorInterface)
        )
      )
  }

  refreshToken(refreshToken: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${environment.apiEndpoint}/auth/refresh`, {
      refreshToken,
    })
  }
}
