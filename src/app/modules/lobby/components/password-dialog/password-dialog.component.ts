import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'

@Component({
  selector: 'app-lobby-password-dialog',
  templateUrl: './password-dialog.component.html',
})
export class PasswordDialogComponent {
  password: string
  errorMessage: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private lobbyHttpService: LobbyHttpService,
    private dialogRef: MatDialogRef<PasswordDialogComponent>
  ) {}

  submit(): void {
    this.lobbyHttpService.join(this.data, this.password).subscribe(
      (res) => {
        this.dialogRef.close(res)
      },
      (error) => {
        this.errorMessage = error.error
      }
    )
  }
}
