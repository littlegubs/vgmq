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

  register(data: RegistrationForm): Observable<RegisterResponse | null> {
    return this.http.post<RegisterResponse>(`${this.apiEndpoint}/auth/register`, data, { withCredentials: true })
  }

  login(data: LoginForm): Observable<LoginResponse | null> {
    return this.http
      .post<LoginResponse | null>(`${this.apiEndpoint}/auth/login`, data)
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
