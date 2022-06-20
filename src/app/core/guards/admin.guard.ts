import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn && this.authService.isAdmin) {
      return true
    } else if (this.authService.isLoggedIn && !this.authService.isAdmin) {
      return this.router.createUrlTree([''])
    } else if (!this.authService.isLoggedIn) {
      if (state.url?.length) {
        sessionStorage.setItem('pastedUrl', state.url.split('?')[0])
      }
      if (Object.keys(next.queryParams).length) {
        sessionStorage.setItem('pastedUrlQueryParams', JSON.stringify(next.queryParams))
      }
      return this.router.createUrlTree(['login'])
    } else {
      return this.router.createUrlTree([''])
    }
  }
}
