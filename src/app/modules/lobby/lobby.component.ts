import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Lobby, LobbyJoinResponse, LobbyStatuses } from '../../shared/models/lobby'
import { MatDialog } from '@angular/material/dialog'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
})
export class LobbyComponent implements OnInit, OnDestroy {
  lobbyCode: string
  lobby?: Lobby
  lobbyStatuses = LobbyStatuses
  subscriptions: Subscription[] = []

  constructor(
    private lobbyHttpService: LobbyHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
    // this.store.dispatch(disconnect())
    // this.lobbyEventSourceService.disconnect()
  }

  ngOnInit(): void {
    this.subscriptions
      .push
      // this.store.select('lobby').subscribe((res) => {
      //   if (res.lobby) {
      //     this.lobby = res.lobby
      //     this.lobbyEventSourceService.joinLobby(this.lobby)
      //   } else {
      //     this.route.paramMap.subscribe((params) => {
      //       this.lobbyCode = params.get('code')
      //     })
      //     this.lobbyHttpService.join(this.lobbyCode).subscribe(
      //       (res) => {
      //         this.dispatchLobby(res)
      //       },
      //       (error) => {
      //         if (error.status === 401) {
      //           const passwordDialog = this.dialog.open(PasswordDialogComponent, {
      //             data: this.lobbyCode,
      //           })
      //           passwordDialog.afterClosed().subscribe((res: LobbyJoinResponse | undefined) => {
      //             if (res instanceof LobbyJoinResponse) {
      //               this.dispatchLobby(res)
      //             } else {
      //               void this.router.navigate(['/'])
      //             }
      //           })
      //         }
      //       }
      //     )
      //   }
      // })
      ()
  }

  leave(): void {
    this.lobbyHttpService.leave(this.lobbyCode).subscribe(() => {
      void this.router.navigate(['/'])
      // this.store.dispatch(disconnect())
    })
  }

  private dispatchLobby(res: LobbyJoinResponse): void {
    this.lobby = res.lobby
    // this.lobbyEventSourceService.joinLobby(this.lobby)
    // this.store.dispatch(join({ lobby: this.lobby, role: res.role, gameNames: res.gameNames }))
  }
}
