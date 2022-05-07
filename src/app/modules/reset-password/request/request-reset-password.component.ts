import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../../core/http/auth.http.service'
import { finalize } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
import { ApiErrorInterface } from '../../../shared/models/api-error.interface'
import { AuthService } from '../../../core/services/auth.service'
import { RecaptchaComponent } from 'ng-recaptcha'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
})
export class RequestResetPasswordComponent {
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
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required.bind(this)],
    })
  }

  submit(recaptcha: string): void {
    this.loading = true
    this.authHttpService
      .requestResetPassword(this.form.value, recaptcha)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Email successfully sent', undefined, {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: 'success',
            duration: 10000,
          })
          this.form.reset()
          this.recaptchaComponent.reset()
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
  }
}
