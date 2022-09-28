import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { LobbyUser, LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations'
import { Subscription } from 'rxjs'

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
export class UsersComponent implements OnInit, OnDestroy {
  @Input() showRank = false
  users: LobbyUser[]
  lobbyStatus: string
  lobbyStatuses = LobbyStatuses
  lobbyUserRoles = LobbyUserRoles
  subscriptions: Subscription[] = []
  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.users.subscribe((res) => {
        this.users = res
      }),
      this.lobbyStore.lobby.subscribe((res) => {
        this.lobbyStatus = res.status
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

  animationDone(event: AnimationEvent) {
    console.log(event)
  }
}
