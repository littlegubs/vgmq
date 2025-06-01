import { Component, OnInit } from '@angular/core'
import { LobbyStore } from '../../../core/store/lobby.store'
import { LocalStorageHelper } from '../../../core/helpers/local-storage-helper'

@Component({
  selector: 'app-lobby-playing',
  templateUrl: './playing.component.html',
  standalone: false,
})
export class PlayingComponent implements OnInit {
  meIsPremium: boolean = false

  constructor(private lobbyStore: LobbyStore, public localStorageHelper: LocalStorageHelper) {}

  ngOnInit(): void {
    this.lobbyStore.me.subscribe((me) => {
      if (me !== null) {
        this.meIsPremium = me.user.premium
      }
    })
  }
}
