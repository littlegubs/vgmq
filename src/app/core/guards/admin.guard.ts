import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.authService.isAdmin ?? this.router.createUrlTree([''])
  }
}
