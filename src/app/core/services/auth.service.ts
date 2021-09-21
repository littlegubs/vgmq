import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import * as jwtDecode from 'jwt-decode'
import { JwtPayload } from '../../shared/models/jwt-payload'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  get isLoggedIn(): boolean {
    return this.cookieService.check('vgmq-ut-hp')
  }

  logout(): void {
    this.cookieService.delete('vgmq-ut-hp', '/', environment.cookieDomain)
  }

  decodeJwt(): JwtPayload {
    return jwtDecode(this.cookieService.get('vgmq-ut-hp'))
  }

  get isAdmin(): boolean {
    const JwtPayload = this.decodeJwt()

    return JwtPayload.roles.includes('ADMIN')
  }
}
