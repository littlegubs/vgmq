import { Component, OnInit } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { AuthHttpService } from '../../../core/http/auth.http.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  loading = false
  constructor(
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.route.paramMap.subscribe((param) => {
      this.authHttpService
        .confirm(param.get('token'))
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (res) => {
            this.authService.setAccessTokenCookie(res.accessToken)
            this.authService.setRefreshTokenCookie(res.refreshToken)
            this.snackBar.open('Account activated!', undefined, {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              panelClass: 'success',
              duration: 5000,
            })
            void this.router.navigate(['/'])
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this.snackBar.open('account already activated', undefined, {
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
                panelClass: 'danger',
                duration: 5000,
              })
            }
            void this.router.navigate(['/login'])
          },
        })
    })
  }
}
