import { Component } from '@angular/core'
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { ProfileHttpService } from '../../../../core/http/profile.http.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { NgClass, NgIf } from '@angular/common'
import { AuthService } from '../../../../core/services/auth.service'

@Component({
  selector: 'app-edit-username-dialog',
  templateUrl: './edit-username-dialog.component.html',
  imports: [ReactiveFormsModule, NgClass, NgIf, MatDialogActions],
})
export class EditUsernameDialogComponent {
  errorMessage = ''
  loading = false
  usernameControl = new FormControl<string>('', [Validators.required.bind(this), Validators.minLength(4)])
  username: string
  constructor(
    private profileHttpService: ProfileHttpService,
    public dialogRef: MatDialogRef<EditUsernameDialogComponent>,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.username = this.authService.decodeJwt().username
    this.usernameControl.setValue(this.authService.decodeJwt().username)
    console.log(this.usernameControl.defaultValue)
  }

  keepUsername(): void {
    this.errorMessage = undefined
    this.loading = true
    this.profileHttpService
      .keepUsername()
      .pipe(
        finalize(() => {
          this.loading = false
          this.dialogRef.close()
        })
      )
      .subscribe({
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message
        },
      })
  }

  submitUpdateUsername(): void {
    this.errorMessage = undefined
    this.loading = true
    this.profileHttpService
      .updateUsername(this.usernameControl.value)
      .pipe(
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe({
        next: (res) => {
          this.authService.setAccessTokenCookie(res.accessToken)
          this.authService.setRefreshTokenCookie(res.refreshToken)
          this.snackBar.open('Username changed successfully', undefined, {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: 'success',
            duration: 5000,
          })
          this.dialogRef.close()
        },
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message
        },
      })
  }
}
