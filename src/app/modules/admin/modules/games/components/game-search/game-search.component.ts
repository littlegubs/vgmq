import { Component, OnInit } from '@angular/core'
import { Game } from '../../../../../../shared/models/game'
import { AdminGameHttpService } from '../../../../../../core/http/admin-game.http.service'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
})
export class GameSearchComponent implements OnInit {
  games: Game[] = []
  query = ''
  http: Subscription
  loading = false

  constructor(private adminGameHttpService: AdminGameHttpService) {}

  ngOnInit(): void {
    this.search()
  }

  search(): void {
    if (this.http) {
      this.http.unsubscribe()
    }
    this.loading = true
    this.http = this.adminGameHttpService
      .search(this.query)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.games = res.data.map((game) => new Game(game))
      })
  }
}
