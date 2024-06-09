import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { UserFromAdmin } from '../../../../../../../shared/models/user'
import { FormControl, Validators } from '@angular/forms'
import { UsersHttpService } from '../../../../../../../core/http/admin/users-http.service'
import { finalize } from 'rxjs/operators'
import { ApiErrorInterface } from '../../../../../../../shared/models/api-error.interface'

@Component({
  selector: 'app-ban-dialog',
  templateUrl: './ban-dialog.component.html',
})
export class BanDialogComponent {
  errorMessage = ''
  loading = false
  form = new FormControl<string>(null, Validators.required.bind(this))

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: UserFromAdmin },
    private usersHttpService: UsersHttpService,
    public dialogRef: MatDialogRef<BanDialogComponent>
  ) {}

  submit(): void {
    this.errorMessage = undefined
    this.loading = true

    this.usersHttpService
      .ban(this.data.user.id, this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.dialogRef.close({ action: 'banned' })
        },
        error: (error: ApiErrorInterface) => {
          if (Array.isArray(error.message)) {
            this.form.setErrors({
              serverError: error.message[0].errors,
            })
          } else {
            this.errorMessage = error.message
          }
        },
      })
  }
}
