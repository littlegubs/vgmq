import { Component, Input, OnInit } from '@angular/core'
import { LobbyUser, LobbyUserRoles, LobbyUserStatuses } from '../../../../shared/models/lobby-user'
import { LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations'

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
export class UsersComponent implements OnInit {
  @Input() showRank = false
  users: LobbyUser[]
  lobbyStatus: string
  lobbyStatuses = LobbyStatuses
  lobbyUserRoles = LobbyUserRoles
  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.lobbyStore.users.subscribe((res) => {
      this.users = res
    })
    this.lobbyStore.lobby.subscribe((res) => {
      this.lobbyStatus = res.status
    })
  }

  getStatusClass(lobbyUser: LobbyUser): string {
    if (lobbyUser.disconnected) {
      return 'text-muted'
    }
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
