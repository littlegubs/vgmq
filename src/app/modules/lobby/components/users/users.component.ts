import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyUser, LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import { LobbySocket } from '../../../../core/socket/lobby.socket'

@Component({
  selector: 'app-lobby-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  users: LobbyUser[]
  me: LobbyUser
  lobbyUserRoles = LobbyUserRoles
  subscriptions: Subscription[] = []
  constructor(private lobbyStore: LobbyStore, private socket: LobbySocket) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.users.subscribe((res) => {
        this.users = res
      }),
      this.lobbyStore.me.subscribe((res) => {
        this.me = res
      }),
    ]
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}
