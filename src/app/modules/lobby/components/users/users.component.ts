import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '../../../../core/reducers/index.reducer'
import { LobbyUser, LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { selectLobbyUsers } from '../../../../core/reducers/lobby.reducer'

@Component({
  selector: 'app-lobby-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: LobbyUser[]
  lobbyUserRoles = LobbyUserRoles
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectLobbyUsers).subscribe((res) => {
      this.users = res
    })
  }
}
