import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { catchError, switchMap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthenticationToken(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          if (new RegExp(`^${environment.apiEndpoint}(?!/auth)`).exec(request.url) !== null) {
            return this.authService.refreshToken().pipe(
              switchMap((data) => {
                this.authService.setAccessTokenCookie(data.accessToken)

                return next.handle(this.addAuthenticationToken(request))
              })
            )
          } else {
            if (new RegExp(`^${environment.apiEndpoint}/auth`).exec(request.url) !== null) {
              this.authService.logout()
            }

            return throwError(error)
          }
        } else {
          return throwError(error)
        }
      })
    )
  }

  private addAuthenticationToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    if (
      new RegExp(`^${environment.apiEndpoint}/auth(?!/logout)`).exec(request.url) !== null ||
      new RegExp(`^${environment.apiEndpoint}(?!/auth(?!/logout))`).exec(request.url) === null ||
      this.authService.getAccessToken() === null
    ) {
      return request
    } else {
      return request.clone({
        withCredentials: true,
        ...(!environment.production && {
          setHeaders: {
            Authorization: `Bearer ${this.authService.getAccessToken()}`,
          },
        }),
      })
    }
  }
}
