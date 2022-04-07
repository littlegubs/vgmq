import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { Game } from '../../../../shared/models/game'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  games: Game<number>[] = []
  gamesCount: number
  http: Subscription
  loading = false
  myGames = false
  form = new FormGroup({
    query: new FormControl('', Validators.required.bind(this)),
    myGames: new FormControl(false),
  })

  constructor(private gameHttpService: GameHttpService) {}

  ngOnInit(): void {
    this.search()
    this.form.valueChanges.subscribe(() => {
      this.search()
    })
  }

  search(): void {
    if (this.http) {
      this.http.unsubscribe()
    }
    this.loading = true
    this.http = this.gameHttpService
      .search(this.form.value, 0, 24)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.gamesCount = res.count
        this.games = res.data
      })
  }

  onScrollDown(): void {
    this.http = this.gameHttpService
      .search(this.form.value, this.games.length, 24)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.games = [...this.games, ...res.data]
      })
  }
}
