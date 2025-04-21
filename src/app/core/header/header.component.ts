import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { AuthHttpService } from '../http/auth.http.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
})
export class HeaderComponent {
  isProfileOpen = false
  showAdminNav = false
  username: string
  @ViewChild('userDropdown') userDropdown: ElementRef
  @ViewChild('userDropdownMobile') userDropdownMobile: ElementRef

  constructor(private authService: AuthService, private authHttpService: AuthHttpService) {
    this.showAdminNav = this.authService.isAdmin
    this.authService.userSubject.subscribe((usr) => {
      this.username = usr.username
    })
  }

  @HostListener('document:click', ['$event'])
  handleClickOut(event: PointerEvent): void {
    if (
      !(
        this.userDropdown.nativeElement.contains(event.target) ||
        this.userDropdownMobile.nativeElement.contains(event.target)
      )
    ) {
      if (this.isProfileOpen) {
        this.toggleProfileMenu()
      }
    }
  }

  toggleProfileMenu(): void {
    this.isProfileOpen = !this.isProfileOpen
  }

  logout(): void {
    this.authHttpService.logout().subscribe(() => {})
    this.authService.logout()
  }
}
