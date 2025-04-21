import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { ProfileHttpService } from '../../../core/http/profile.http.service'
import { AuthService } from '../../../core/services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  standalone: false,
})
export class ConfirmDeleteDialogComponent {
  errorMessage?: string
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    private profileHttpService: ProfileHttpService,
    private authService: AuthService
  ) {}

  submit(): void {
    this.profileHttpService.deleteUser().subscribe({
      next: () => {
        this.dialogRef.close()
        this.authService.logout()
      },
      error: ({ error }: HttpErrorResponse) => {
        this.errorMessage = error.message
      },
    })
  }

  close(): void {
    this.dialogRef.close()
  }
}
