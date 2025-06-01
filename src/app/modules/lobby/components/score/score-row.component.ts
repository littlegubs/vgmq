import { Component, Input } from '@angular/core'
import { LobbyUser } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-score-row',
  templateUrl: './score-row.component.html',
  standalone: false,
})
export class ScoreRowComponent {
  @Input() user: LobbyUser
}
