import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-center-container',
  templateUrl: './center-container.component.html',
})
export class CenterContainerComponent implements OnInit, OnDestroy {
  answer?: string | null
  subscriptions: Subscription[] = []
  lobby?: Lobby | null
  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.currentLobbyMusicAnswer.subscribe((res) => {
        this.answer = res
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
        if (lobby.status !== LobbyStatuses.AnswerReveal) {
          this.answer = null
        }
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}