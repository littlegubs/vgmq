import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-countdown',
  templateUrl: './countdown.component.html',
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown: number
  countdownInterval: number
  subscriptions: Array<Subscription>

  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval)
        }
        if (lobby?.status === LobbyStatuses.PlayingMusic) {
          this.countdown = lobby.guessTime - 1
          this.startCountdown()
        } else if (lobby?.status === LobbyStatuses.AnswerReveal) {
          this.countdown = undefined
        }
      }),
      this.lobbyStore.currentLobbyMusic.subscribe((lobbyMusic) => {
        if (lobbyMusic?.musicFinishesIn) {
          if (this.countdownInterval) {
            clearInterval(this.countdownInterval)
          }
          this.countdown = lobbyMusic.musicFinishesIn - 1
          this.startCountdown()
        }
      }),
    ]
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval)
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--
      } else {
        this.countdown = undefined
        clearInterval(this.countdownInterval)
      }
    }, 1000)
  }
}
