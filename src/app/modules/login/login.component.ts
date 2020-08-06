import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { finalize } from 'rxjs/operators'
import { LoginFormErrorResponse } from '../../shared/models/login-form'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup
  formErrorMessage: string
  loading = false
  limitedAccessForm: FormGroup
  limitedAccessLoading = false
  limitedAccessAllowed = true
  limitedAccessError: string

  constructor(private fb: FormBuilder, private router: Router, private authHttpService: AuthHttpService) {
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
        () => {
          void this.router.navigate([''])
        },
        (errorResponse: LoginFormErrorResponse) => {
          this.formErrorMessage = errorResponse.message
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
        (error) => {
          this.limitedAccessError = error.error
        }
      )
  }

  setLimitedAccessAllowed(): void {
    this.authHttpService.limitedAccessAllowed().subscribe((res) => {
      this.limitedAccessAllowed = res
    })
  }
}
