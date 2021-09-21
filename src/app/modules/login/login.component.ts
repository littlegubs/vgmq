import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { finalize } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service'
import { environment } from '../../../environments/environment'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup
  formErrorMessage: string
  loading = false
  limitedAccessForm?: FormGroup
  limitedAccessLoading = false
  limitedAccessAllowed = true
  limitedAccessError?: string[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authHttpService: AuthHttpService,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required.bind(this)],
      password: ['', Validators.required.bind(this)],
    })

    this.limitedAccessForm = this.fb.group({
      password: ['', Validators.required.bind(this)],
    })

    this.setLimitedAccessAllowed()
  }

  loginUser(): void {
    this.loading = true
    this.authHttpService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (res) => {
          if (res !== null) {
            if (!environment.production) {
              const tokenArray = res.access_token.split('.')
              this.cookieService.set('vgmq-ut-hp', `${tokenArray[0]}.${tokenArray[1]}`)
              this.cookieService.set('vgmq-ut-s', tokenArray[2])
              this.cookieService.set('vgmq-urt', res.refresh_token)
            }
          }
          void this.router.navigate([''])
        },
        (errorResponse: ApiErrorInterface) => {
          // this.formErrorMessage = errorResponse.message
          this.loginForm.get('password').setValue('')
        }
      )
  }

  testLimitedAccessPassword(): void {
    this.limitedAccessLoading = true
    this.limitedAccessError = undefined
    this.authHttpService
      .limitedAccessPassword(this.limitedAccessForm.get('password').value)
      .pipe(finalize(() => (this.limitedAccessLoading = false)))
      .subscribe(
        () => {
          this.setLimitedAccessAllowed()
        },
        (error: ApiErrorInterface) => {
          if (Array.isArray(error.message)) {
            error.message.map((err) => {
              if (typeof err !== 'string') {
                const formControl = this.limitedAccessForm.get(err.property)
                formControl?.markAsTouched()
                formControl?.setErrors({
                  serverError: err.errors,
                })
              }
            })
          }
        }
      )
  }

  setLimitedAccessAllowed(): void {
    this.authHttpService.limitedAccessAllowed().subscribe((res) => {
      this.limitedAccessAllowed = res
    })
  }
}
