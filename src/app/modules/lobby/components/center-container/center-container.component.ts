import { Component, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyStatuses } from '../../../../shared/models/lobby'

@Component({
  selector: 'app-lobby-center-container',
  templateUrl: './center-container.component.html',
})
export class CenterContainerComponent implements OnInit {
  answer?: string | null
  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.lobbyStore.currentLobbyMusicAnswer.subscribe((res) => {
      this.answer = res
    })
    this.lobbyStore.lobby.subscribe((lobby) => {
      if (lobby.status !== LobbyStatuses.AnswerReveal) {
        this.answer = null
      }
    })
  }
}
