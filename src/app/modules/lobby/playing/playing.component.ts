import { Component, OnInit } from '@angular/core'
import { LobbyStore } from '../../../core/store/lobby.store'

@Component({
  selector: 'app-lobby-playing',
  templateUrl: './playing.component.html',
})
export class PlayingComponent implements OnInit {
  meIsPremium: boolean = false

  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.meIsPremium = this.lobbyStore.getMe().user.patreonAccount.premium
  }
}
