import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import * as jwtDecode from 'jwt-decode'
import { JwtPayload } from '../../shared/models/jwt-payload'
import { environment } from '../../../environments/environment'
import { Observable, throwError } from 'rxjs'
import { AuthHttpService } from '../http/auth.http.service'
import { Router } from '@angular/router'
import { tap } from 'rxjs/operators'
import { UserStore } from '../store/user.store'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiEndpoint = environment.apiEndpoint
  constructor(
    private cookieService: CookieService,
    private authHttpService: AuthHttpService,
    private router: Router,
    private userStore: UserStore
  ) {}

  get isLoggedIn(): boolean {
    return this.cookieService.check('vgmq-ut-hp')
  }

  logout(): void {
    this.cookieService.delete('vgmq-ut-hp', '/', environment.cookieDomain)
    this.cookieService.delete('vgmq-ut-s', '/', environment.cookieDomain)
    this.cookieService.delete('vgmq-urt', '/', environment.cookieDomain)
    this.userStore.setUserLoggedIn(false)
    void this.router.navigate(['/'])
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
    this.cookieService.set('vgmq-ut-hp', `${tokenArray[0]}.${tokenArray[1]}`, undefined, '/')
    this.cookieService.set('vgmq-ut-s', tokenArray[2], undefined, '/')
    this.userStore.setUserLoggedIn(true)
  }

  setRefreshTokenCookie(refreshToken: string): void {
    this.cookieService.set('vgmq-urt', refreshToken, undefined, '/')
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = this.cookieService.get('vgmq-urt')
    if (null === refreshToken) {
      this.logout()

      return throwError(() => new Error('no refresh token'))
    }

    return this.authHttpService.refreshToken(refreshToken).pipe(
      tap((res) => {
        this.setAccessTokenCookie(res.accessToken)
      })
    )
  }

  loginWithGoogle(): void {
    window.location.href = `${this.apiEndpoint}/oauth/google`
  }
}
