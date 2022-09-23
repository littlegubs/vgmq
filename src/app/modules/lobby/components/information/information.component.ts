import { Component, OnInit } from '@angular/core'
import { Lobby } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import { LobbyUser, LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { CustomSocket } from '../../../../core/socket/custom.socket'

@Component({
  selector: 'app-lobby-information',
  templateUrl: './information.component.html',
})
export class InformationComponent implements OnInit {
  subscriptions: Subscription[] = []
  me: LobbyUser
  lobbyUserRoles = LobbyUserRoles

  lobby?: Lobby | null
  constructor(private lobbyStore: LobbyStore, private socket: CustomSocket) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
      }),
      this.lobbyStore.me.subscribe((lobbyUser) => {
        this.me = lobbyUser
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  restart() {
    this.socket.emit('restart')
  }
}
