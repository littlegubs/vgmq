import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  showAdminNav = false

  constructor(private authService: AuthService) {
    this.showAdminNav = this.authService.isAdmin
  }
}
