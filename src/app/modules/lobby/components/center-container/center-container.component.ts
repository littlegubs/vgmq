import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Lobby } from '../../../../shared/models/lobby'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-center-container',
  templateUrl: './center-container.component.html',
})
export class CenterContainerComponent implements OnInit, OnDestroy {
  answer?: string | null
  subscriptions: Subscription[] = []
  lobby?: Lobby | null
  canPlayMusic = false
  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.canPlayMusic.subscribe((canPlayMusic) => {
        this.canPlayMusic = canPlayMusic
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  play() {
    this.lobbyStore.setResumeMusic()
  }
}
