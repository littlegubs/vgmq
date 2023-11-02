import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/shared/models/user'
import { Lobby } from 'src/app/shared/models/lobby'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { MatDialog } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { LobbyListSocket } from '../../core/socket/lobby-list.socket'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  publicLobbies: Lobby[]
  customLobbies: Lobby[]
  user: User
  subscriptions: Subscription[] = []

  constructor(
    private router: Router,
    private lobbyHttpService: LobbyHttpService,
    private dialog: MatDialog,
    private socket: LobbyListSocket
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
    this.socket.disconnect()
  }

  ngOnInit(): void {
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
  }
}
