import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Lobby, LobbyStatuses } from '../../shared/models/lobby'
import { MatDialog } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { LobbyService } from '../../core/services/lobby.service'
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component'
import { CustomSocket } from '../../core/socket/custom.socket'
import { AuthService } from '../../core/services/auth.service'
import { LobbyStore } from '../../core/store/lobby.store'
import { LobbyUser } from '../../shared/models/lobby-user'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LobbyMusic } from '../../shared/models/lobby-music'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
})
export class LobbyComponent implements OnInit, OnDestroy {
  lobbyCode: string
  lobby?: Lobby
  lobbyStatuses = LobbyStatuses
  subscriptions: Subscription[] = []
  reconnecting = false

  constructor(
    private lobbyHttpService: LobbyHttpService,
    public lobbyService: LobbyService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private socket: CustomSocket,
    private authService: AuthService,
    private lobbyStore: LobbyStore,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
    this.lobbyStore.disconnect()
    this.socket.disconnect()
  }

  ngOnInit(): void {
    this.socket.connect()
    this.subscriptions = [
      this.socket.fromEvent('UnauthorizedException').subscribe(() => {
        // disconnect to create a new connection with a refreshed jwt
        this.reconnecting = true
        this.socket.disconnect()
        this.authService.refreshToken().subscribe(() => {
          this.socket.connect()
          this.socket.emitWithoutSaving('reconnect', this.lobbyCode)
          this.socket.emit(this.socket.lastTriedOutputEventName, ...this.socket.lastTriedOutputArgs)
        })
      }),
      this.socket.fromEvent('MissingPasswordException').subscribe(() => {
        const passwordDialog = this.dialog.open(PasswordDialogComponent, {
          data: this.lobbyCode,
        })
        passwordDialog.afterClosed().subscribe(() => {
          if (this.lobby === undefined) {
            void this.router.navigate(['/'])
          }
        })
      }),
      this.socket.fromEvent('lobbyJoined').subscribe((event: Lobby) => {
        this.lobby = event
        this.lobbyStore.setLobby(this.lobby)
      }),
      this.socket.fromEvent('lobbyUsers').subscribe((event: LobbyUser[]) => {
        console.log(event)
        this.lobbyStore.setUsers(event)
      }),
      this.socket.fromEvent('lobby').subscribe((event: Lobby) => {
        this.lobby = event
        this.lobbyStore.setLobby(this.lobby)
      }),
      this.socket.fromEvent('lobbyMusic').subscribe((lobbyMusicId: ArrayBuffer) => {
        this.lobbyStore.setCurrentLobbyMusicId(lobbyMusicId)
      }),
      this.socket.fromEvent('lobbyAnswer').subscribe((answer: LobbyMusic) => {
        this.lobbyStore.setCurrentLobbyMusicAnswer(answer)
      }),
      this.socket.fromEvent('lobbyUserAnswer').subscribe((answer: LobbyUser) => {
        this.lobbyStore.handleLobbyUserAnswer(answer)
      }),
      this.socket.fromEvent('lobbyReset').subscribe((event: Lobby) => {
        this.lobby = event
        this.lobbyStore.setLobby(this.lobby)
        this.lobbyStore.setCurrentLobbyMusicId(null)
        this.lobbyStore.setCurrentLobbyMusicAnswer(null)
      }),
      this.socket.fromEvent('lobbyToast').subscribe((message: string) => {
        this.snackBar.open(message, undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: 'danger',
          duration: 5000,
        })
      }),
      this.socket.fromEvent('disconnect').subscribe(() => {
        if (this.reconnecting === false) {
          void this.router.navigate(['/'])
        }
      }),

      this.route.paramMap.subscribe((params) => {
        this.lobbyCode = params.get('code')
      }),
    ]
    this.lobbyService.join(this.lobbyCode)
  }
}
