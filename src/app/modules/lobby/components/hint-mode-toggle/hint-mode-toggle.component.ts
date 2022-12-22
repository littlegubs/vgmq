import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import { LobbyUser } from '../../../../shared/models/lobby-user'
import { Lobby, LobbyHintMode } from '../../../../shared/models/lobby'
import {LobbySocket} from "../../../../core/socket/lobby.socket";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-hint-mode-toggle',
  templateUrl: './hint-mode-toggle.component.html',
})
export class HintModeToggleComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  me: LobbyUser
  lobby: Lobby

  lobbyHintMode = LobbyHintMode
  constructor(private lobbyStore: LobbyStore, private lobbySocket: LobbySocket) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.me.subscribe((me) => {
        if (!me) return
        this.me = me
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        if (!lobby) return
        this.lobby = lobby
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  enableHintMode(): void {
    this.lobbySocket.emit('enableHintMode')
  }

  toggleKeepHintMode($event: MatSlideToggleChange): void {
    this.lobbySocket.emit('toggleKeepHintMode', $event.checked)
  }
}
