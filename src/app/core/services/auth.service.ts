import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  get isLoggedIn(): boolean {
    return this.cookieService.check('vgmq-ut-hp')
  }

  logout(): void {
    this.cookieService.delete('vgmq-ut-hp')
  }
}
