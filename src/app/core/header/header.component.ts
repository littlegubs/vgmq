import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  showAdminNav = false

  constructor(private authService: AuthService, private router: Router) {
    this.showAdminNav = this.authService.isAdmin
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
