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
import { OAuthHttpService } from '../../core/http/oauth.http.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false,
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

  loadingUnlinkPatreon = false
  loadingRefreshPatreon = false

  constructor(
    public dialog: MatDialog,
    private profileHttpService: ProfileHttpService,
    private oauthHttpService: OAuthHttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.getCurrentUser()
  }

  private getCurrentUser(): Subscription {
    return this.profileHttpService.getCurrentUser().subscribe((res) => {
      this.user = res
    })
  }

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
          this.getCurrentUser()
        },
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message
        },
      })
  }

  openDeleteDialog(): void {
    this.dialog.open(ConfirmDeleteDialogComponent)
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  patreonOAuth(): void {
    window.open(
      `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=nfItBwy3Cx9lObjpVyANkAgm3Z6GFHHoBOGIg_cCJY4lI-Xqwx6rdmKKKozBxSx9&redirect_uri=${window.location.origin}/oauth/patreon`,
      '_self'
    )
  }

  refreshPatreon(): void {
    this.loadingRefreshPatreon = true
    this.oauthHttpService.refreshPatreon().subscribe(() => {
      this.profileHttpService
        .getCurrentUser()
        .pipe(finalize(() => (this.loadingRefreshPatreon = false)))
        .subscribe((res) => {
          this.user = res
        })
    })
  }

  unlinkPatreon(): void {
    this.loadingUnlinkPatreon = true
    this.oauthHttpService
      .unlinkPatreon()
      .pipe(finalize(() => (this.loadingUnlinkPatreon = false)))
      .subscribe(() => {
        this.user.patreonAccount = null
      })
  }
}
