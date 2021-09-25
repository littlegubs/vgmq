import { Component, OnInit } from '@angular/core'
import { Game } from '../../../../../../shared/models/game'
import { GameHttpService } from '../../../../../../core/http/game-http.service'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
})
export class GameSearchComponent implements OnInit {
  games: Game[] = []
  gamesCount: number
  query = ''
  showDisabled = false
  http: Subscription
  loading = false

  constructor(private adminGameHttpService: GameHttpService) {}

  ngOnInit(): void {
    this.search()
  }

  search(): void {
    if (this.http) {
      this.http.unsubscribe()
    }
    this.loading = true
    this.http = this.adminGameHttpService
      .search(this.query, this.showDisabled)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.gamesCount = res.count
        this.games = res.data
      })
  }

  toggleShowDisabled(): void {
    this.showDisabled = !this.showDisabled
    this.search()
  }
}
