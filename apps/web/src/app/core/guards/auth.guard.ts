import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn
    if (isLoggedIn) {
      return true
    } else {
      if (state.url?.length) {
        sessionStorage.setItem('pastedUrl', state.url.split('?')[0])
      }
      if (Object.keys(next.queryParams).length) {
        sessionStorage.setItem('pastedUrlQueryParams', JSON.stringify(next.queryParams))
      }

      return this.router.createUrlTree(['login'])
    }
  }
}
