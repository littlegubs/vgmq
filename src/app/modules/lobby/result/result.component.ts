import { Component, OnInit } from '@angular/core'
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component'
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component'
import { filter, firstValueFrom } from 'rxjs'
import { LobbyStore } from '../../../core/store/lobby.store'
import { LobbyUser } from '../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-result',
  imports: [LeaderboardComponent, ScoreboardComponent],
  templateUrl: './result.component.html',
})
export class ResultComponent implements OnInit {
  hideLeaderBoard: boolean = false
  users: LobbyUser[]

  constructor(private lobbyStore: LobbyStore) {}

  async ngOnInit(): Promise<void> {
    const users = await firstValueFrom(
      this.lobbyStore.users.pipe(
        filter((users) => users !== null && users.length > 0 && users.some((user) => user.stats !== undefined))
      )
    )
    this.users = this.lobbyStore.sortUsersByPoints(users)
  }
}
