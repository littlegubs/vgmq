import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { LobbyUser, LobbyUserRoles, LobbyUserStatus } from '../../../../shared/models/lobby-user'
import { Lobby, LobbyHintMode } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations'
import { Subscription } from 'rxjs'
import { LobbySocket } from '../../../../core/socket/lobby.socket'

@Component({
  selector: 'app-lobby-users',
  templateUrl: './users.component.html',
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
          color: '#56ff43',
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
  standalone: false,
})
export class UsersComponent implements OnInit, OnDestroy {
  @Input() showRank = false
  users: LobbyUser[]
  me: LobbyUser
  lobby: Lobby
  lobbyHintModes = LobbyHintMode
  lobbyUserRoles = LobbyUserRoles
  lobbyUserStatus = LobbyUserStatus
  subscriptions: Subscription[] = []
  constructor(private lobbyStore: LobbyStore, private socket: LobbySocket) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.users.subscribe((res) => {
        this.users = res
      }),
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

  getStatusClass(lobbyUser: LobbyUser): string {
    if (lobbyUser.correctAnswer === false) {
      return 'wrongAnswer'
    }
    if (lobbyUser.correctAnswer === true) {
      return 'correctAnswer'
    }

    return 'default'
  }

  kick(user: LobbyUser): void {
    this.socket.emit('kick', user.user.username)
  }
}
