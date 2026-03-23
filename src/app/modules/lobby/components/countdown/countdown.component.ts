import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { firstValueFrom, Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-countdown',
  templateUrl: './countdown.component.html',
  standalone: false,
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown: number | undefined
  countdownInterval: NodeJS.Timeout | undefined
  subscriptions: Array<Subscription> = []

  isPaused: boolean = false

  constructor(private lobbyStore: LobbyStore) {}

  async ngOnInit(): Promise<void> {
    const lobby = await firstValueFrom(this.lobbyStore.lobby)
    this.countdown = lobby.guessTime - 1
    this.startCountdown()

    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.isPaused = lobby?.isPaused ?? false
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
    if (this.countdownInterval) clearInterval(this.countdownInterval)
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  startCountdown(): void {
    // Clear any existing interval to prevent overlapping countdowns
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }

    this.countdownInterval = setInterval(() => {
      if (this.isPaused) {
        return
      }

      if (this.countdown !== undefined && this.countdown > 0) {
        this.countdown--
      } else {
        this.countdown = undefined
        clearInterval(this.countdownInterval)
      }
    }, 1000)
  }
}
