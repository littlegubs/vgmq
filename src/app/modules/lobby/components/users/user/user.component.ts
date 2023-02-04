import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { LobbyUser, LobbyUserRoles } from '../../../../../shared/models/lobby-user'
import { Lobby, LobbyHintMode } from '../../../../../shared/models/lobby'
import { Subscription } from 'rxjs'
import { LobbyStore } from '../../../../../core/store/lobby.store'
import { LobbySocket } from '../../../../../core/socket/lobby.socket'
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-lobby-user',
  templateUrl: './user.component.html',
  animations: [
    trigger('userStatus', [
      state(
        'wrongAnswer',
        style({
          color: 'white',
        })
      ),
      state(
        'correctAnswer',
        style({
          color: 'green',
        })
      ),
      state(
        'default',
        style({
          color: 'white',
        })
      ),
      transition('* => wrongAnswer', [
        animate('1s', keyframes([style({ color: 'red', offset: 0 }), style({ color: 'white', offset: 0.75 })])),
      ]),
    ]),
  ],
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() lobbyUser: LobbyUser

  me: LobbyUser | null
  lobby: Lobby
  lobbyHintModes = LobbyHintMode
  lobbyUserRoles = LobbyUserRoles
  subscriptions: Subscription[] = []
  constructor(private lobbyStore: LobbyStore, private socket: LobbySocket) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.me.subscribe((res) => {
        this.me = res
      }),
      this.lobbyStore.lobby.subscribe((res) => {
        this.lobby = res
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  getStatusClass(): string {
    if (this.lobbyUser.correctAnswer === false) {
      return 'wrongAnswer'
    }
    if (this.lobbyUser.correctAnswer === true) {
      return 'correctAnswer'
    }

    return 'default'
  }

  kick(): void {
    this.socket.emit('kick', this.lobbyUser.user.username)
  }
}
