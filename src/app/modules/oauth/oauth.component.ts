import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-oauth',
  template: `<p>Authenticating...</p> `,
})
export class OauthComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['accessToken'] as string
      const refreshToken = params['refreshToken'] as string
      if (accessToken && refreshToken) {
        this.authService.setAccessTokenCookie(accessToken)
        this.authService.setRefreshTokenCookie(refreshToken)
        void this.router.navigate([''])
      } else {
        console.error('Authentication failed')
        void this.router.navigate([''])
      }
    })
  }
}
