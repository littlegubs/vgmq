import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/shared/models/user'
import { Lobby, LobbyJoinResponse } from 'src/app/shared/models/lobby'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { MatDialog } from '@angular/material/dialog'
import { PasswordDialogComponent } from '../lobby/components/password-dialog/password-dialog.component'
import { join } from '../../core/actions/lobby.actions'
import { Store } from '@ngrx/store'
import { AppState } from '../../core/reducers/index.reducer'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public lobby: Lobby
  showFilter = false
  isPrivate = false
  isPlaying = false
  isFull = false
  lobbies: Lobby[]
  user: User

  constructor(
    private router: Router,
    private lobbyHttpService: LobbyHttpService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.lobbyHttpService.list().subscribe((res) => {
      this.lobbies = res
    })
  }

  joinLobby(lobby: Lobby): void {
    if (lobby.hasPassword) {
      const passwordDialog = this.dialog.open(PasswordDialogComponent, {
        data: lobby.code,
      })
      passwordDialog.afterClosed().subscribe((res: LobbyJoinResponse | undefined) => {
        if (res instanceof LobbyJoinResponse) {
          this.store.dispatch(join({ lobby: res.lobby, role: res.role }))
          void this.router.navigate([`/lobby/${res.lobby.code}`])
        }
      })
    } else {
      void this.router.navigate([`/lobby/${lobby.code}`])
    }
  }

  showFilters(): void {
    this.showFilter = !this.showFilter
  }
}
