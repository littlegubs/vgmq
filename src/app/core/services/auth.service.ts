import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import * as jwtDecode from 'jwt-decode'
import { JwtPayload } from '../../shared/models/jwt-payload'
import { environment } from '../../../environments/environment'
import { Observable, throwError } from 'rxjs'
import { AuthHttpService } from '../http/auth.http.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private authHttpService: AuthHttpService) {}

  get isLoggedIn(): boolean {
    return this.cookieService.check('vgmq-ut-hp')
  }

  logout(): void {
    this.cookieService.delete('vgmq-ut-hp', '/', environment.cookieDomain)
  }

  decodeJwt(): JwtPayload {
    return jwtDecode(this.getAccessToken())
  }

  get isAdmin(): boolean {
    const jwtPayload = this.decodeJwt()

    return jwtPayload.roles?.includes('admin')
  }

  getAccessToken(): string {
    return `${this.cookieService.get('vgmq-ut-hp')}.${this.cookieService.get('vgmq-ut-s')}`
  }

  setAccessTokenCookie(accessToken: string): void {
    const tokenArray = accessToken.split('.')
    this.cookieService.set('vgmq-ut-hp', `${tokenArray[0]}.${tokenArray[1]}`)
    this.cookieService.set('vgmq-ut-s', tokenArray[2])
  }

  setRefreshTokenCookie(refreshToken: string): void {
    this.cookieService.set('vgmq-urt', refreshToken)
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = this.cookieService.get('vgmq-urt')
    if (null === refreshToken) {
      this.logout()

      return throwError('no refresh token')
    }

    return this.authHttpService.refreshToken(refreshToken)
  }
}
