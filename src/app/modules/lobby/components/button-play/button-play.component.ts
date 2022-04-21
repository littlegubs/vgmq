import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { Subscription } from 'rxjs'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { CustomSocket } from '../../../../core/socket/custom.socket'
import { Router } from '@angular/router'

@Component({
  selector: 'app-button-play',
  templateUrl: './button-play.component.html',
})
export class ButtonPlayComponent implements OnInit, OnDestroy {
  lobby?: Lobby
  role: string
  lobbyUsersRoles = LobbyUserRoles
  lobbyStatus = LobbyStatuses
  subscriptions: Subscription[] = []

  constructor(
    private lobbyHttpService: LobbyHttpService,
    private lobbyStore: LobbyStore,
    private socket: CustomSocket,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
      }),
      this.lobbyStore.me.subscribe((me) => {
        if (me !== null) {
          this.role = me.role
        }
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  play(): void {
    this.socket.emit('play', this.lobby.code)
  }
  leave(): void {
    this.lobbyHttpService.leave().subscribe(() => {
      void this.router.navigate(['/'])
    })
  }

  showPlayButton(): boolean {
    return (
      this.role === this.lobbyUsersRoles.Host &&
      [LobbyStatuses.Waiting.toString(), LobbyStatuses.Loading.toString()].includes(this.lobby.status)
    )
  }
}
