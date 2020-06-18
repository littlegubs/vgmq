import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import jwtDecode from 'jwt-decode'
import { JwtPaylod } from '../../shared/models/jwt-paylod'
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

  decodeJwt(): JwtPaylod {
    return new JwtPaylod(jwtDecode(this.cookieService.get('vgmq-ut-hp')))
  }

  get isAdmin(): boolean {
    const JwtPayload = this.decodeJwt()
    return JwtPayload.roles.includes('ROLE_ADMIN') || JwtPayload.roles.includes('ROLE_SUPER_ADMIN')
  }
}
