import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-lobby-countdown-progress',
  templateUrl: './countdown-progress.component.html',
  animations: [
    trigger('countdownProgress', [
      state(
        'full',
        style({
          width: '100%',
        })
      ),
      state(
        'empty',
        style({
          width: '0',
        })
      ),
      state(
        'default',
        style({
          width: '25%',
        })
      ),
      transition('* => empty', [animate('{{timing}}s')], { params: { timing: '20' } }),
      transition('* => full', [animate('10s')]),
    ]),
  ],
  standalone: false,
})
export class CountdownProgressComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription>
  lobby: Lobby
  lobbyStatuses = LobbyStatuses
  timeRemaining: number

  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
        this.timeRemaining = undefined
      }),
      this.lobbyStore.currentLobbyMusic.subscribe((lobbyMusic) => {
        if (lobbyMusic?.musicFinishesIn) {
          this.timeRemaining = lobbyMusic.musicFinishesIn >= 0 ? lobbyMusic.musicFinishesIn : 0
        } else {
          this.timeRemaining = undefined
        }
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}
