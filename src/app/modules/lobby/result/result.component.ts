import { Component } from '@angular/core'
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component'

@Component({
  selector: 'app-lobby-result',
  imports: [LeaderboardComponent],
  templateUrl: './result.component.html',
})
export class ResultComponent {
  hideLeaderBoard: boolean = false
}
