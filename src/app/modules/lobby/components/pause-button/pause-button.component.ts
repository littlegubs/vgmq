import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { LobbySocket } from '../../../../core/socket/lobby.socket'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-pause-button',
  imports: [MatIcon],
  templateUrl: './pause-button.component.html',
})
export class PauseButtonComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  isPaused = false
  constructor(private lobbySocket: LobbySocket, private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.isPaused = lobby.isPaused
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
  protected onPauseOrResume(): void {
    this.lobbySocket.emit('pauseResume')
  }
}
