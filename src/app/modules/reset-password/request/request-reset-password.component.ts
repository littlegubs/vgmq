import { AfterViewInit, Component, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthHttpService } from '../../../core/http/auth.http.service'
import { finalize } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
import { ApiErrorInterface } from '../../../shared/models/api-error.interface'
import { MatSnackBar } from '@angular/material/snack-bar'
import { RecaptchaService } from '../../../shared/services/recaptcha.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
})
export class RequestResetPasswordComponent implements AfterViewInit, OnDestroy {
  form: FormGroup
  formErrorMessage: string
  loading = false
  environment = environment
  subscribers: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private authHttpService: AuthHttpService,
    private snackBar: MatSnackBar,
    public recaptchaService: RecaptchaService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required.bind(this)],
    })
    this.subscribers.push(
      this.recaptchaService.resolved.subscribe((token: string) => {
        this.submit(token)
      })
    )
  }

  ngAfterViewInit(): void {
    this.recaptchaService.render()
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((sub) => sub.unsubscribe())
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
          this.recaptchaService.reset()
        },
      })
  }
}
