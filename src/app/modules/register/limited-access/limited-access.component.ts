import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { finalize } from 'rxjs/operators'
import { ApiErrorInterface } from '../../../shared/models/api-error.interface'
import { AuthHttpService } from '../../../core/http/auth.http.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { RecaptchaComponent } from 'ng-recaptcha'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-limited-access',
  templateUrl: './limited-access.component.html',
})
export class LimitedAccessComponent implements OnInit {
  formErrorMessage: string
  limitedAccessLoading = false
  limitedAccessError?: string[]
  limitedAccessForm = new FormGroup({
    password: new FormControl('', Validators.required.bind(this)),
    recaptcha: new FormControl('', Validators.required.bind(this)),
  })
  environment = environment
  @ViewChild('recaptchaPassword') recaptchaPasswordComponent: RecaptchaComponent

  constructor(private dialogRef: MatDialogRef<LimitedAccessComponent>, private authHttpService: AuthHttpService) {}

  ngOnInit(): void {}

  testLimitedAccessPassword(): void {
    this.limitedAccessError = undefined
    this.formErrorMessage = undefined
    this.authHttpService
      .limitedAccessPassword(
        this.limitedAccessForm.get('password').value,
        this.limitedAccessForm.get('recaptcha').value
      )
      .pipe(finalize(() => (this.limitedAccessLoading = false)))
      .subscribe(
        () => {
          this.dialogRef.close(true) //this is here only to give something other than undefined
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
          } else {
            this.formErrorMessage = error.message
          }
          this.recaptchaPasswordComponent.reset()
        }
      )
  }
}
