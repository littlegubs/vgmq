import { AfterViewInit, Component, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { finalize } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'
import { AuthService } from '../../core/services/auth.service'
import { RecaptchaService } from '../../shared/services/recaptcha.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  loginForm: FormGroup
  formErrorMessage: string
  loading = false
  environment = environment
  subscribers: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    public recaptchaService: RecaptchaService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required.bind(this)],
      password: ['', Validators.required.bind(this)],
    })
    this.subscribers.push(
      this.recaptchaService.resolved.subscribe((token: string) => {
        this.loginUser(token)
      })
    )
  }

  ngAfterViewInit(): void {
    this.recaptchaService.render()
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((sub) => sub.unsubscribe())
  }

  loginUser(recaptcha: string): void {
    this.loading = true
    this.authHttpService
      .login(this.loginForm.value, recaptcha)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          if (res !== null) {
            if (!environment.production) {
              this.authService.setAccessTokenCookie(res.accessToken)
              this.authService.setRefreshTokenCookie(res.refreshToken)
            }
          }
          const pastedUrl = sessionStorage.getItem('pastedUrl')
          const pastedUrlQueryParamsString = sessionStorage.getItem('pastedUrlQueryParams')
          if (pastedUrl) {
            sessionStorage.removeItem('pastedUrl')
            sessionStorage.removeItem('pastedUrlQueryParams')
            void this.router.navigate(
              [pastedUrl],
              pastedUrlQueryParamsString ? { queryParams: JSON.parse(pastedUrlQueryParamsString) } : undefined
            )
          } else {
            void this.router.navigate([''])
          }
        },
        error: (errorResponse: ApiErrorInterface) => {
          if (Array.isArray(errorResponse.message)) {
            errorResponse.message.map((err) => {
              if (typeof err !== 'string') {
                const formControl = this.loginForm.get(err.property)
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

  googleAuth(): void {
    this.authService.loginWithGoogle()
  }
}
