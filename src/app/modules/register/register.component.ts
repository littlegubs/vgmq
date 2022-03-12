import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthHttpService } from '../../core/http/auth.http.service'
import { finalize } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service'
import { MatDialog } from '@angular/material/dialog'
import { LimitedAccessComponent } from './limited-access/limited-access.component'
import { environment } from '../../../environments/environment'
import { RecaptchaComponent } from 'ng-recaptcha'
import { HttpErrorResponse } from '@angular/common/http'
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  signupForm: FormGroup
  formErrorMessage: string
  loading = false
  environment = environment
  @ViewChild('recaptcha') recaptchaComponent: RecaptchaComponent

  constructor(
    private fb: FormBuilder,
    private authHttpService: AuthHttpService,
    private router: Router,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required.bind(this), Validators.minLength(4)]],
      email: ['', [Validators.required.bind(this), Validators.email.bind(this)]],
      password: ['', [Validators.required.bind(this), Validators.minLength(3)]],
    })
    this.checkLimitedAccessAllowed()
  }

  ngOnDestroy() {
    this.dialog.closeAll()
  }

  registerUser(recaptcha: string): void {
    this.loading = true
    this.authHttpService
      .register(this.signupForm.value, recaptcha)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.signupForm.reset()
          this.authService.setAccessTokenCookie(res.accessToken)
          this.authService.setRefreshTokenCookie(res.refreshToken)
          void this.router.navigate(['/'])
        },
        error: (error: HttpErrorResponse) => {
          error = error.error
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
          this.recaptchaComponent.reset()
        },
      })
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
  checkLimitedAccessAllowed(): void {
    this.authHttpService.limitedAccessAllowed().subscribe((res) => {
      if (res === false) {
        this.dialog
          .open(LimitedAccessComponent, {
            disableClose: true,
          })
          .afterClosed()
          .subscribe((res: boolean | undefined) => {
            if (res !== undefined) {
              this.checkLimitedAccessAllowed()
            }
          })
      }
    })
  }
}
