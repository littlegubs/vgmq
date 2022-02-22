import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { LobbyService } from '../../../../core/services/lobby.service'
import { CustomSocket } from '../../../../core/socket/custom.socket'

@Component({
  selector: 'app-lobby-password-dialog',
  templateUrl: './password-dialog.component.html',
})
export class PasswordDialogComponent {
  password: string
  errorMessage: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private lobbyService: LobbyService,
    private socket: CustomSocket,
    private dialogRef: MatDialogRef<PasswordDialogComponent>
  ) {}

  submit(): void {
    this.lobbyService.join(this.data, this.password)
    this.socket.fromEvent('InvalidPasswordException').subscribe(() => {
      this.errorMessage = 'Invalid password'
    })
  }
}
