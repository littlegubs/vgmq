import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyMusic } from '../../../../shared/models/lobby-music'
import { GameHttpService } from '../../../../core/http/game-http.service'

@Component({
  selector: 'app-lobby-answer-reveal',
  templateUrl: './answer-reveal.component.html',
})
export class AnswerRevealComponent implements OnInit, OnDestroy {
  answer?: LobbyMusic<number> | null
  subscriptions: Subscription[] = []
  constructor(private lobbyStore: LobbyStore, private gameHttpService: GameHttpService) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.currentLobbyMusicAnswer.subscribe((res) => {
        this.answer = res
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
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
