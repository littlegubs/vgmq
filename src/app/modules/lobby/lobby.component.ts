import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Lobby, LobbyStatuses, Message } from '../../shared/models/lobby'
import { MatDialog } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { LobbyService } from '../../core/services/lobby.service'
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component'
import { LobbySocket } from '../../core/socket/lobby.socket'
import { AuthService } from '../../core/services/auth.service'
import { LobbyStore } from '../../core/store/lobby.store'
import { LobbyUser } from '../../shared/models/lobby-user'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LobbyMusic } from '../../shared/models/lobby-music'
import { LobbyFileSocket } from '../../core/socket/lobby-file.socket'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
})
export class LobbyComponent implements OnInit, OnDestroy {
  lobbyCode: string
  lobby?: Lobby
  lobbyStatuses = LobbyStatuses
  subscriptions: Subscription[] = []

  isSafari = false

  constructor(
    private lobbyHttpService: LobbyHttpService,
    public lobbyService: LobbyService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private socket: LobbySocket,
    private authService: AuthService,
    private lobbyStore: LobbyStore,
    private snackBar: MatSnackBar,
    private lobbyFileSocket: LobbyFileSocket
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
    this.lobbyStore.disconnect()
    this.socket.disconnect()
    this.lobbyFileSocket.disconnect()
  }

  ngOnInit(): void {
    this.isSafari = new RegExp(/^(?!.*chrome.*)(?=.*safari.*).*$/i).test(navigator.userAgent)
    this.socket.connect()
    this.subscriptions = [
      this.socket.fromEvent('connect_error').subscribe((error: Error) => {
        if (error.message === 'Unauthorized') {
          // disconnect to create a new connection with a refreshed jwt
          this.lobbyFileSocket.disconnect()
          this.authService.refreshToken().subscribe(() => {
            this.socket.connect()
            this.lobbyFileSocket.connect()
            this.socket.emit('fake emit') // I don't know why, but I need to do this so the 'join' event is emitted again
          })
        }
      }),
      this.lobbyFileSocket.fromEvent('connect_error').subscribe((error: Error) => {
        if (error.message === 'Unauthorized') {
          if (this.lobby) {
            this.lobbyFileSocket.disconnect()
            this.lobbyFileSocket.connect()
            this.lobbyFileSocket.emit('fake emit') // I don't know why, but I need to do this to prevent an infinite loop
          }
        }
      }),
      this.socket.fromEvent('NotFoundException').subscribe(() => {
        void this.router.navigate(['/'])
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
        this.lobbyFileSocket.connect()
        this.lobbyFileSocket.emit('join')
      }),
      this.socket.fromEvent('lobbyUsers').subscribe((event: LobbyUser[]) => {
        console.log(event)
        this.lobbyStore.setUsers(event)
      }),
      this.socket.fromEvent('lobby').subscribe((event: Lobby) => {
        this.lobby = event
        this.lobbyStore.setLobby(this.lobby)
      }),
      this.lobbyFileSocket.fromEvent('buffer').subscribe((arrayBuffer: ArrayBuffer) => {
        this.lobbyStore.setCurrentLobbyAudioBuffer(arrayBuffer)
        this.socket.emit('readyToPlayMusic')
      }),
      this.socket
        .fromEvent('currentLobbyMusic')
        .subscribe((event: { contributeToMissingData: boolean; musicFinishesIn: number }) => {
          this.lobbyStore.setCurrentLobbyMusic(event as LobbyMusic)
        }),
      this.socket.fromEvent('lobbyAnswer').subscribe((answer: LobbyMusic) => {
        this.lobbyStore.setCurrentLobbyMusicAnswer(answer)
      }),
      this.socket.fromEvent('lobbyUser').subscribe((answer: LobbyUser) => {
        this.lobbyStore.updateLobbyUser(answer)
      }),
      this.socket.fromEvent('lobbyReset').subscribe((event: Lobby) => {
        this.lobby = event
        this.lobbyStore.setLobby(this.lobby)
        this.lobbyStore.setCurrentLobbyAudioBuffer(null)
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
        void this.router.navigate(['/'])
      }),
      this.socket.fromEvent('chat').subscribe((payload: Message) => {
        this.lobbyStore.addMessage(payload)
      }),
      this.socket.fromEvent('hintModeGames').subscribe((payload: string[]) => {
        this.lobbyStore.setHintModeGames(payload)
      }),
      this.socket.fromEvent('lobbyLoadProgress').subscribe((progress: number) => {
        this.lobbyStore.setLobbyLoadProgress(progress)
      }),
      this.route.paramMap.subscribe((params) => {
        this.lobbyCode = params.get('code')
      }),
    ]
    this.lobbyService.join(this.lobbyCode)
  }
}
