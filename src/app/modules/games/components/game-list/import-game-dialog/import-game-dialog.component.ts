import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { GameHttpService } from '../../../../../core/http/game-http.service'
import { ApiErrorInterface } from '../../../../../shared/models/api-error.interface'
import { AdminGameHttpService } from '../../../../../core/http/admin-game-http.service'
import { AuthService } from '../../../../../core/services/auth.service'

@Component({
  selector: 'app-import-game-dialog',
  templateUrl: './import-game-dialog.component.html',
})
export class ImportGameDialogComponent {
  loading = false
  errorMessage?: string
  form = new FormControl<string>(null, Validators.required.bind(this))
  importedGames: string[] = []

  constructor(
    public dialogRef: MatDialogRef<ImportGameDialogComponent>,
    private gameHttpService: GameHttpService,
    private adminGameHttpService: AdminGameHttpService,
    private authService: AuthService
  ) {}

  submit(): void {
    this.errorMessage = undefined
    this.loading = true
    this.importedGames = []
    const observable = this.authService.isAdmin
      ? this.adminGameHttpService.importByUrl(this.form.value)
      : this.gameHttpService.importByUrl(this.form.value)

    observable.pipe(finalize(() => (this.loading = false))).subscribe({
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
