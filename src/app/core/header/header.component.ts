import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { AuthHttpService } from '../http/auth.http.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isProfileOpen = false
  showAdminNav = false
  username: string

  constructor(private authService: AuthService, private authHttpService: AuthHttpService, private router: Router) {
    this.showAdminNav = this.authService.isAdmin
    this.username = this.authService.decodeJwt().username
  }

  toggleProfileMenu(): void {
    this.isProfileOpen = !this.isProfileOpen
  }

  logout(): void {
    this.authHttpService.logout().subscribe(() => {})
    this.authService.logout()
  }
}
