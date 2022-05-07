import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/shared/models/user'
import { Lobby } from 'src/app/shared/models/lobby'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { MatDialog } from '@angular/material/dialog'
import { PasswordDialogComponent } from '../lobby/components/password-dialog/password-dialog.component'

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

  constructor(private router: Router, private lobbyHttpService: LobbyHttpService, private dialog: MatDialog) {}

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
      passwordDialog.afterClosed().subscribe((res: Lobby | undefined) => {
        if (res) {
          void this.router.navigate([`/lobby/${res.code}`])
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
