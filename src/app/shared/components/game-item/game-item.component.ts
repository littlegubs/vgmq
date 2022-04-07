import { Component, Input, OnInit, Optional } from '@angular/core'
import { Game } from '../../models/game'
import { ParentComponent } from '../../interfaces/parent.interface'
import { GameSearchComponent } from '../../../modules/admin/modules/games/components/game-search/game-search.component'
import { GameHttpService } from '../../../core/http/game-http.service'

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
})
export class GameItemComponent implements OnInit {
  @Input('game') game: Game<number>
  isAdminSearchComponent = true

  constructor(private gameHttpService: GameHttpService, @Optional() private parentComponent?: ParentComponent) {}

  ngOnInit(): void {
    this.isAdminSearchComponent = this.parentComponent instanceof GameSearchComponent
  }

  addToList(game: Game<number>): void {
    this.gameHttpService.addToList(game.slug).subscribe(() => {
      game.selectedByUser = !game.selectedByUser
    })
  }

  removeFromList(game: Game<number>): void {
    this.gameHttpService.removeFromList(game.slug).subscribe(() => {
      game.selectedByUser = !game.selectedByUser
    })
  }
}
