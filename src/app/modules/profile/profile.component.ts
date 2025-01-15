import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component'
import { User } from '../../shared/models/user'
import { ProfileHttpService } from '../../core/http/profile.http.service'
import { Subscription } from 'rxjs'
import { passwordMatchValidator } from './password-match.validator'
import { finalize } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: Partial<User>
  userSub: Subscription
  loading = false
  errorMessage?: string
  successMessage?: string
  passwordForm = new FormGroup(
    {
      currentPassword: new FormControl<string>('', Validators.required.bind(this)),
      newPassword: new FormControl<string>('', [Validators.required.bind(this), Validators.minLength(3)]),
      confirmNewPassword: new FormControl<string>('', [Validators.required.bind(this), Validators.minLength(3)]),
    },
    { validators: passwordMatchValidator() }
  )
  usernameForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required.bind(this), Validators.minLength(4)]),
  })

  constructor(
    public dialog: MatDialog,
    private profileHttpService: ProfileHttpService,
    private authService: AuthService
  ) {}

  submitUpdatePassword(): void {
    this.errorMessage = undefined
    this.successMessage = undefined
    this.loading = true
    const formValues = this.passwordForm.value
    this.profileHttpService
      .updatePassword(formValues.currentPassword, formValues.newPassword)
      .pipe(
        finalize(() => {
          this.loading = false
          this.passwordForm.reset()
        })
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Password changed successfully'
        },
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message
        },
      })
  }

  submitUpdateUsername(): void {
    this.errorMessage = undefined
    this.successMessage = undefined
    this.loading = true
    const formValues = this.usernameForm.value
    this.profileHttpService
      .updateUsername(formValues.username)
      .pipe(
        finalize(() => {
          this.loading = false
          this.usernameForm.reset()
        })
      )
      .subscribe({
        next: (res) => {
          this.successMessage = 'Username changed successfully'
          this.authService.setAccessTokenCookie(res.accessToken)
          this.authService.setRefreshTokenCookie(res.refreshToken)
        },
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message
        },
      })
  }

  openDeleteDialog(): void {
    this.dialog.open(ConfirmDeleteDialogComponent)
  }

  ngOnInit(): void {
    this.userSub = this.profileHttpService.getCurrentUser().subscribe((res) => {
      this.user = res
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
