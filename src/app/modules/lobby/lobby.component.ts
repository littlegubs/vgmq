import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Lobby, LobbyJoinResponse, LobbyStatuses } from '../../shared/models/lobby'
import { MatDialog } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { LobbyService } from '../../core/services/lobby.service'
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component'
import { CustomSocket } from '../../core/socket/custom.socket'
import { AuthService } from '../../core/services/auth.service'
import { LobbyStore } from '../../core/store/lobby.store'
import { LobbyUser } from '../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
})
export class LobbyComponent implements OnInit, OnDestroy {
  lobbyCode: string
  lobby?: Lobby
  lobbyStatuses = LobbyStatuses
  subscriptions: Subscription[] = []

  constructor(
    private lobbyHttpService: LobbyHttpService,
    public lobbyService: LobbyService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private socket: CustomSocket,
    private authService: AuthService,
    private lobbyStore: LobbyStore
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
    // this.store.dispatch(disconnect())
    // this.lobbyEventSourceService.disconnect()
  }

  ngOnInit(): void {
    this.socket.fromEvent('unauthorizedException').subscribe((event) => {
      this.authService.refreshToken().subscribe(() => {
        this.socket.emit(this.socket.lastTriedOutputEventName, this.socket.lastTriedOutputArgs)
      })
    })
    this.socket.fromEvent('lobbyJoined').subscribe((event: Lobby) => {
      this.lobby = event
      this.lobbyStore.setLobby(this.lobby)
    })
    this.socket.fromEvent('userJoined').subscribe((event: LobbyUser[]) => {
      this.lobbyStore.setUsers(event)
    })
    this.socket.fromEvent('lobby').subscribe((event: Lobby) => {
      this.lobby = event
      this.lobbyStore.setLobby(this.lobby)
    })
    this.route.paramMap.subscribe((params) => {
      this.lobbyCode = params.get('code')
    })
    this.lobbyService.join(this.lobbyCode)
    this.subscriptions.push(
      this.lobbyHttpService.join(this.lobbyCode).subscribe(
        (res) => {
          this.lobby = res.lobby
          this.lobbyStore.setLobby(this.lobby)
        },
        (error) => {
          if (error.status === 401) {
            const passwordDialog = this.dialog.open(PasswordDialogComponent, {
              data: this.lobbyCode,
            })
            passwordDialog.afterClosed().subscribe((res: LobbyJoinResponse | undefined) => {
              if (res !== undefined) {
                // this.dispatchLobby(res)
              } else {
                void this.router.navigate(['/'])
              }
            })
          }
        }
      )
    )
  }

  leave(): void {
    this.lobbyHttpService.leave(this.lobbyCode).subscribe(() => {
      void this.router.navigate(['/'])
      // this.store.dispatch(disconnect())
    })
  }

  private dispatchLobby(res: LobbyJoinResponse): void {
    this.lobby = res.lobby
    // this.lobbyEventSourceService.joinLobby(this.lobby)
    // this.store.dispatch(join({ lobby: this.lobby, role: res.role, gameNames: res.gameNames }))
  }
}
