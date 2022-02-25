import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { LobbyService } from '../../../../core/services/lobby.service'
import { CustomSocket } from '../../../../core/socket/custom.socket'
import { FormControl, Validators } from '@angular/forms'
import {Lobby} from "../../../../shared/models/lobby";

@Component({
  selector: 'app-lobby-password-dialog',
  templateUrl: './password-dialog.component.html',
})
export class PasswordDialogComponent implements OnInit {
  password = new FormControl('', Validators.required.bind(this))
  errorMessage: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private lobbyService: LobbyService,
    private socket: CustomSocket,
    private dialogRef: MatDialogRef<PasswordDialogComponent>
  ) {}

  ngOnInit() {
    this.socket.fromEvent('InvalidPasswordException').subscribe(() => {
      this.password.setErrors({ serverError: 'invalid password' })
    })
    this.socket.fromEvent('lobbyJoined').subscribe((lobby: Lobby) => {
      console.log('???dd')
      this.dialogRef.close(lobby)
    })
  }

  submit(): void {
    console.log('???')
    this.lobbyService.join(this.data, this.password.value)
    this.socket.fromEvent('InvalidPasswordException').subscribe(() => {
      this.errorMessage = 'Invalid password'
    })
  }
}
