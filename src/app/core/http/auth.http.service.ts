import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { RegistrationForm } from '../../shared/models/registration-form'
import { LoginForm } from '../../shared/models/login-form'

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  register(data: RegistrationForm): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/register`, data)
  }

  login(data: LoginForm): Observable<any> {
    return this.http.post<any>(`${this.apiEndpoint}/login`, data)
  }

  getUserProfile(id): Observable<any> {
    const api = `${this.apiEndpoint}/user-profile/${id}`
    return this.http.get(api).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError((err) => this.handleError(err))
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let msg = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(msg)
  }
}
