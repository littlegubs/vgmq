import { Component, Input, OnInit } from '@angular/core'
import { LobbyUser, LobbyUserRoles, LobbyUserStatuses } from '../../../../shared/models/lobby-user'
import { LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'

@Component({
  selector: 'app-lobby-users',
  templateUrl: './users.component.html',
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
    if (lobbyUser.status === LobbyUserStatuses.WrongAnswer) {
      return 'text-danger'
    }
    if (lobbyUser.status === LobbyUserStatuses.CorrectAnswer) {
      return 'text-success'
    }
    if (lobbyUser.answered) {
      return 'text-primary'
    }
  }
}
