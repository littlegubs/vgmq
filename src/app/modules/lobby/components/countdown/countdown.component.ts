import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import {AudioContext} from "angular-audio-context";

@Component({
  selector: 'app-lobby-countdown',
  templateUrl: './countdown.component.html',
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown: number
  countdownInterval: number
  audioContextInterval: number
  subscriptions: Array<Subscription>

  constructor(private lobbyStore: LobbyStore, private audioContext: AudioContext
) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        console.log(this.audioContext.state)

        if (this.countdownInterval) {
          clearInterval(this.countdownInterval)
        }
        if (lobby?.status === LobbyStatuses.PlayingMusic) {
          this.countdown = lobby.guessTime
          this.startCountdown()
        } else if (lobby?.status === LobbyStatuses.AnswerReveal) {
          this.countdown = 10
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
        console.log(this.audioContext.state)
        this.countdown--
      } else {
        this.countdown = undefined
        clearInterval(this.countdownInterval)
      }
    }, 1000)
  }
}
