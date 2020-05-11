import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { RegistrationFormApiErrorResponse } from '../../shared/models/registration-form'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  signupForm: FormGroup
  loading = false

  constructor(private fb: FormBuilder, private authHttpService: AuthHttpService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required.bind(this), Validators.minLength(4)]],
      email: ['', [Validators.required.bind(this), Validators.email.bind(this)]],
      password: ['', [Validators.required.bind(this), Validators.minLength(8)]],
    })
  }

  registerUser(): void {
    this.loading = true
    this.authHttpService
      .register(this.signupForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.signupForm.reset()
          this.router.navigate([''])
        },
        (res: RegistrationFormApiErrorResponse) => {
          res.errors.forEach((error) => {
            //TODO only shows the last error for each field, find a solution to show more (server side)
            this.signupForm.get(error.field).setErrors({ apiError: error.message })
          })
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
