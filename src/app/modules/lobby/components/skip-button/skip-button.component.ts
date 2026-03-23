import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { LobbySocket } from '../../../../core/socket/lobby.socket'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import { LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-lobby-skip-button',
  imports: [MatIcon, MatProgressSpinner, NgClass],
  templateUrl: './skip-button.component.html',
})
export class SkipButtonComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  voteSkip = 0
  playersCount = 1
  votedSkip = false
  isPaused = false
  constructor(private lobbySocket: LobbySocket, private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.voteSkip = lobby.voteSkip
        this.isPaused = lobby.isPaused
      }),
      this.lobbyStore.users.subscribe((users) => {
        this.playersCount = users.filter((lobbyUser) => {
          return lobbyUser.role !== LobbyUserRoles.Spectator && !lobbyUser.disconnected
        }).length
      }),
      this.lobbyStore.me.subscribe((me) => {
        this.votedSkip = me?.voteSkip
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
  protected onVoteSkip(): void {
    this.lobbySocket.emit('voteSkip')
  }
  protected onUnvoteSkip(): void {
    this.lobbySocket.emit('unvoteSkip')
  }

  protected getVisualPercentage(): number {
    return (this.voteSkip / (Math.floor(this.playersCount / 2) + 1)) * 100
  }
}
