import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { RegistrationForm, RegistrationFormApiErrorResponse } from '../../shared/models/registration-form'
import { LoginForm, LoginFormErrorResponse } from '../../shared/models/login-form'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  register(data: RegistrationForm): Observable<[]> {
    return this.http
      .post<[]>(`${this.apiEndpoint}/register`, data)
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(new RegistrationFormApiErrorResponse(httpErrorResponse.error))
        )
      )
  }

  login(data: LoginForm): Observable<[]> {
    return this.http
      .post<[]>(`${this.apiEndpoint}/login`, data)
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(new LoginFormErrorResponse(httpErrorResponse.error))
        )
      )
  }
}
