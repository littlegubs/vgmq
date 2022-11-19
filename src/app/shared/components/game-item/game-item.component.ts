import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core'
import { Game } from '../../models/game'
import { ParentComponent } from '../../interfaces/parent.interface'
import { GameSearchComponent } from '../../../modules/admin/modules/games/components/game-search/game-search.component'
import { GameHttpService } from '../../../core/http/game-http.service'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
})
export class GameItemComponent implements OnInit {
  @Input() game: Game
  isAdminSearchComponent = true
  hidden = true
  isAdmin = false
  @Output() selected = new EventEmitter()

  constructor(
    private gameHttpService: GameHttpService,
    private authService: AuthService,
    @Optional() private parentComponent?: ParentComponent
  ) {}

  ngOnInit(): void {
    this.isAdminSearchComponent = this.parentComponent instanceof GameSearchComponent
    this.isAdmin = this.authService.isAdmin
  }

  addToList(game: Game): void {
    this.gameHttpService.addToList(game.slug).subscribe(() => {
      game.selectedByUser = !game.selectedByUser
    })
  }

  removeFromList(game: Game): void {
    this.gameHttpService.removeFromList(game.slug).subscribe(() => {
      game.selectedByUser = !game.selectedByUser
    })
  }

  click(): void {
    this.selected.emit()
  }
}
