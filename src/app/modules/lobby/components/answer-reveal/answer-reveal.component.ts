import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyMusic } from '../../../../shared/models/lobby-music'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { LobbyUser } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-answer-reveal',
  templateUrl: './answer-reveal.component.html',
})
export class AnswerRevealComponent implements OnInit, OnDestroy {
  answer?: LobbyMusic | null
  me: LobbyUser
  interactedWithList = false
  subscriptions: Subscription[] = []
  constructor(private lobbyStore: LobbyStore, private gameHttpService: GameHttpService) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.currentLobbyMusicAnswer.subscribe((res) => {
        this.answer = res
        this.interactedWithList = false
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        if (lobby.status !== LobbyStatuses.AnswerReveal) {
          this.answer = null
        }
      }),
      this.lobbyStore.currentLobbyMusic.subscribe((lobbyMusic) => {
        if (lobbyMusic !== null) {
          this.answer = lobbyMusic
        }
      }),
      this.lobbyStore.me.subscribe((me) => {
        if (!this.interactedWithList) {
          this.me = { ...me }
        }
      }),
    ]
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  addToList(): void {
    this.gameHttpService.addToList(this.answer.gameToMusic.game.slug).subscribe(() => {
      this.me.playedTheGame = true
      this.interactedWithList = true
    })
  }

  removeFromList(): void {
    this.gameHttpService.removeFromList(this.answer.gameToMusic.game.slug).subscribe(() => {
      this.me.playedTheGame = false
      this.interactedWithList = true
    })
  }
}
