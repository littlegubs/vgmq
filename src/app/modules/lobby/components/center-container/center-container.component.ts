import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Lobby, LobbyHintMode, LobbyStatuses } from '../../../../shared/models/lobby'
import { Subscription } from 'rxjs'
import { LobbyUser, LobbyUserStatus } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-center-container',
  templateUrl: './center-container.component.html',
})
export class CenterContainerComponent implements OnInit, OnDestroy {
  answer?: string | null
  subscriptions: Subscription[] = []
  lobby?: Lobby | null
  canPlayMusic = false
  lobbyStatuses = LobbyStatuses
  lobbyUserStatus = LobbyUserStatus
  lobbyHintModes = LobbyHintMode
  me: LobbyUser
  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.canPlayMusic.subscribe((canPlayMusic) => {
        this.canPlayMusic = canPlayMusic
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
      }),
      this.lobbyStore.me.subscribe((me) => {
        this.me = me
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  play() {
    this.lobbyStore.setResumeMusic()
  }

  showAnswerComponent(): boolean {
    return !this.me?.hintMode && this.lobby?.status === LobbyStatuses.PlayingMusic
  }
}
