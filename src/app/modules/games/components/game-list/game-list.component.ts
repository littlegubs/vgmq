import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { Game } from '../../../../shared/models/game'
import { GameHttpService } from '../../../../core/http/game-http.service'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  games: Game[] = []
  gamesCount: number
  query = ''
  http: Subscription
  loading = false
  myGames = false

  constructor(private gameHttpService: GameHttpService) {}

  ngOnInit(): void {
    this.search()
  }

  search(): void {
    if (this.http) {
      this.http.unsubscribe()
    }
    this.loading = true
    this.http = this.gameHttpService
      .search(this.query, this.myGames)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.gamesCount = res.count
        this.games = res.data
      })
  }
  toggleMyGames(): void {
    this.myGames = !this.myGames
    this.search()
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
}
