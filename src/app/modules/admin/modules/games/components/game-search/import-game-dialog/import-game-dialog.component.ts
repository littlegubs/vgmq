import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, Validators } from '@angular/forms'
import { GameHttpService } from '../../../../../../../core/http/game-http.service'
import { finalize } from 'rxjs/operators'
import { ApiErrorInterface } from '../../../../../../../shared/models/api-error.interface'

@Component({
  selector: 'app-import-game-dialog',
  templateUrl: './import-game-dialog.component.html',
})
export class ImportGameDialogComponent implements OnInit {
  loading = false
  errorMessage?: string
  form = new FormControl(null, Validators.required.bind(this))
  importedGames: string[] = []

  constructor(public dialogRef: MatDialogRef<ImportGameDialogComponent>, private gameHttpService: GameHttpService) {}

  ngOnInit(): void {}

  submit() {
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
            const urlError = error.message[0]
            if (typeof urlError !== 'string') {
              this.form.setErrors({
                serverError: urlError.errors,
              })
            }
          } else {
            this.errorMessage = error.message
          }
        },
      })
  }
}
