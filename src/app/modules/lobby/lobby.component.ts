import { Component, OnInit } from '@angular/core'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { ActivatedRoute, Router } from '@angular/router'
import { LobbyEventSourceService } from '../../core/services/lobby-event-source.service'
import { Lobby, LobbyJoinResponse } from '../../shared/models/lobby'
import { Store } from '@ngrx/store'
import { join } from '../../core/actions/lobby.actions'
import { AppState } from '../../core/reducers/index.reducer'
import { MatDialog } from '@angular/material/dialog'
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
})
export class LobbyComponent implements OnInit {
  lobbyCode: string
  lobby?: Lobby

  constructor(
    private lobbyHttpService: LobbyHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private lobbyEventSourceService: LobbyEventSourceService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.select('lobby').subscribe((res) => {
      if (res.lobby) {
        this.lobby = res.lobby
        this.lobbyEventSourceService.joinLobby(this.lobby)
      } else {
        this.route.paramMap.subscribe((params) => {
          this.lobbyCode = params.get('code')
        })
        this.lobbyHttpService.join(this.lobbyCode).subscribe(
          (res) => {
            this.dispatchLobby(res)
          },
          (error) => {
            if (error.status === 401) {
              const passwordDialog = this.dialog.open(PasswordDialogComponent, {
                data: this.lobbyCode,
              })
              passwordDialog.afterClosed().subscribe((res: LobbyJoinResponse | undefined) => {
                if (res instanceof LobbyJoinResponse) {
                  this.dispatchLobby(res)
                } else {
                  void this.router.navigate(['/'])
                }
              })
            }
          }
        )
      }
    })
  }

  private dispatchLobby(res: LobbyJoinResponse): void {
    this.lobby = res.lobby
    this.lobbyEventSourceService.joinLobby(this.lobby)
    this.store.dispatch(join({ lobby: this.lobby, role: res.role }))
  }
}
