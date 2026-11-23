import { Component, OnDestroy, OnInit } from '@angular/core'
import { User } from 'src/app/shared/models/user'
import { Lobby } from 'src/app/shared/models/lobby'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { MatDialog } from '@angular/material/dialog'
import { firstValueFrom, Subscription } from 'rxjs'
import { LobbyListSocket } from '../../core/socket/lobby-list.socket'
import { EditUsernameDialogComponent } from './components/edit-username-dialog/edit-username-dialog.component'
import { ProfileHttpService } from '../../core/http/profile.http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  publicLobbies: Lobby[]
  customLobbies: Lobby[]
  user: User
  subscriptions: Subscription[] = []

  constructor(
    private lobbyHttpService: LobbyHttpService,
    private dialog: MatDialog,
    private socket: LobbyListSocket,
    private profileHttpService: ProfileHttpService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
    this.socket.disconnect()
  }

  async ngOnInit(): Promise<void> {
    this.lobbyHttpService.list().subscribe((res) => {
      this.publicLobbies = res.filter((lobby) => !lobby.custom)
      this.customLobbies = res.filter((lobby) => lobby.custom)
    })
    this.socket.connect()
    this.subscriptions = [
      this.socket.fromEvent('lobbyList').subscribe((res: Lobby[]) => {
        this.publicLobbies = res.filter((lobby) => !lobby.custom)
        this.customLobbies = res.filter((lobby) => lobby.custom)
      }),
    ]
    const shouldChangeUsername = await firstValueFrom(this.profileHttpService.shouldChangeUsername())
    if (shouldChangeUsername) {
      this.dialog.open(EditUsernameDialogComponent, { disableClose: true })
    }
  }
}
