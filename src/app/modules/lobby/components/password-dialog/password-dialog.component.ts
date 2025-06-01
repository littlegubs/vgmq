import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { LobbyService } from '../../../../core/services/lobby.service'
import { LobbySocket } from '../../../../core/socket/lobby.socket'
import { FormControl, Validators } from '@angular/forms'
import { Lobby } from '../../../../shared/models/lobby'
import { AuthService } from '../../../../core/services/auth.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-password-dialog',
  templateUrl: './password-dialog.component.html',
  standalone: false,
})
export class PasswordDialogComponent implements OnInit, OnDestroy {
  password = new FormControl('', Validators.required.bind(this))
  errorMessage: string
  subscriptions: Subscription[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private lobbyService: LobbyService,
    private socket: LobbySocket,
    private dialogRef: MatDialogRef<PasswordDialogComponent>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.socket.connect()
    this.subscriptions = [
      this.socket.fromEvent('connect_error').subscribe(() => {
        // disconnect to create a new connection with a refreshed jwt
        this.authService.refreshToken().subscribe(() => {
          this.socket.connect()
          this.socket.emit('fake emit') // I don't know why, but I need to do this either way I have an infinite loop
        })
      }),
      this.socket.fromEvent('InvalidPasswordException').subscribe(() => {
        this.password.setErrors({ serverError: 'invalid password' })
      }),
      this.socket.fromEvent('lobbyJoined').subscribe((lobby: Lobby) => {
        this.dialogRef.close(lobby)
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  submit(): void {
    this.lobbyService.join(this.data, this.password.value)
    this.socket.fromEvent('InvalidPasswordException').subscribe(() => {
      this.errorMessage = 'Invalid password'
    })
  }
}
