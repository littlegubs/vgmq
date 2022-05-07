import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { finalize } from 'rxjs/operators'
import { RecaptchaComponent } from 'ng-recaptcha'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { AuthService } from '../../core/services/auth.service'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  form: FormGroup
  formErrorMessage: string
  loading = false
  environment = environment
  @ViewChild('recaptcha') recaptchaComponent: RecaptchaComponent

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      password: ['', Validators.required.bind(this)],
    })
  }

  submit(recaptcha: string): void {
    this.loading = true
    this.route.paramMap.subscribe((param) => {
      this.authHttpService
        .resetPassword(this.form.value, param.get('token'), recaptcha)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (res) => {
            this.authService.setAccessTokenCookie(res.accessToken)
            this.authService.setRefreshTokenCookie(res.refreshToken)
            this.snackBar.open('Password successfully updated!', undefined, {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              panelClass: 'success',
              duration: 5000,
            })
            void this.router.navigate(['/'])
          },
          error: (errorResponse: ApiErrorInterface) => {
            if (Array.isArray(errorResponse.message)) {
              errorResponse.message.map((err) => {
                if (typeof err !== 'string') {
                  const formControl = this.form.get(err.property)
                  formControl?.markAsTouched()
                  formControl?.setErrors({
                    serverError: err.errors,
                  })
                }
              })
            } else {
              this.formErrorMessage = errorResponse.message
            }
            this.recaptchaComponent.reset()
          },
        })
    })
  }
}
