import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { HttpErrorResponse } from '@angular/common/http'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup
  formErrorMessage: string
  loading = false

  constructor(private fb: FormBuilder, private router: Router, private authHttpService: AuthHttpService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required.bind(this)],
      password: ['', Validators.required.bind(this)],
    })
  }

  loginUser(): void {
    this.loading = true
    this.authHttpService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.router.navigate([''])
        },
        (errorResponse: HttpErrorResponse) => {
          this.formErrorMessage = errorResponse.error.message
          this.loginForm.get('password').setValue('')
        }
      )
  }
}
