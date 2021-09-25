import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { finalize } from 'rxjs/operators'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  signupForm: FormGroup
  formErrorMessage: string
  loading = false

  constructor(
    private fb: FormBuilder,
    private authHttpService: AuthHttpService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required.bind(this), Validators.minLength(4)]],
      email: ['', [Validators.required.bind(this), Validators.email.bind(this)]],
      password: ['', [Validators.required.bind(this), Validators.minLength(3)]],
    })
  }

  registerUser(): void {
    this.loading = true
    this.authHttpService
      .register(this.signupForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (res) => {
          this.signupForm.reset()
          const tokenArray = res.access_token.split('.')
          this.cookieService.set('vgmq-ut-hp', `${tokenArray[0]}.${tokenArray[1]}`)
          this.cookieService.set('vgmq-ut-s', tokenArray[2])
          this.cookieService.set('vgmq-urt', res.refresh_token)
          void this.router.navigate([''])
        },
        (error: ApiErrorInterface) => {
          if (Array.isArray(error.message)) {
            error.message.map((err) => {
              if (typeof err !== 'string') {
                const formControl = this.signupForm.get(err.property)
                formControl?.markAsTouched()
                formControl?.setErrors({
                  serverError: err.errors,
                })
              }
            })
          } else {
            this.formErrorMessage = error.message
          }
        }
      )
  }

  get username(): AbstractControl {
    return this.signupForm.get('username')
  }

  get email(): AbstractControl {
    return this.signupForm.get('email')
  }

  get password(): AbstractControl {
    return this.signupForm.get('password')
  }
}
