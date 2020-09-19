import { Component, OnInit } from '@angular/core'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { ActivatedRoute } from '@angular/router'
import { LobbyEventSourceService } from '../../core/services/lobby-event-source.service'
import { Lobby } from '../../shared/models/lobby'
import { Store } from '@ngrx/store'
import { join } from '../../core/actions/lobby.actions'
import { AppState } from '../../core/reducers/index.reducer'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
})
export class LobbyComponent implements OnInit {
  lobbyCode: string
  lobby?: Lobby

  constructor(
    private lobbyHttpService: LobbyHttpService,
    private route: ActivatedRoute,
    private lobbyEventSourceService: LobbyEventSourceService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.lobbyCode = params.get('code')
    })
    this.lobbyHttpService.join(this.lobbyCode).subscribe((res) => {
      this.lobby = res.lobby
      this.lobbyEventSourceService.joinLobby(this.lobby)
      this.store.dispatch(join({ lobby: this.lobby, role: res.role }))
    })
  }
}
