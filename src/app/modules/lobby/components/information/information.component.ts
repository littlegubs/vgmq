import { Component, OnInit } from '@angular/core'
import { Lobby } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-information',
  templateUrl: './information.component.html',
})
export class InformationComponent implements OnInit {
  subscriptions: Subscription[] = []

  lobby?: Lobby | null
  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}
