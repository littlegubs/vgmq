import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { ApiErrorInterface } from '../../../../../../../shared/models/api-error.interface'
import { AdminGameHttpService } from '../../../../../../../core/http/admin-game-http.service'

@Component({
  selector: 'app-admin-import-game-dialog',
  templateUrl: './admin-import-game-dialog.component.html',
})
export class AdminImportGameDialogComponent {
  loading = false
  errorMessage?: string
  form = new FormControl<string>(null, Validators.required.bind(this))
  importedGames: string[] = []

  constructor(
    public dialogRef: MatDialogRef<AdminImportGameDialogComponent>,
    private gameHttpService: AdminGameHttpService
  ) {}

  submit(): void {
    this.errorMessage = undefined
    this.loading = true
    this.importedGames = []
    this.gameHttpService
      .importByUrl(this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.importedGames = res
          this.form.reset()
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
