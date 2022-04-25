import { Component, OnInit } from '@angular/core'
import { debounceTime, Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { Game } from '../../../../shared/models/game'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  games: Game[] = []
  gamesCount: number
  loading = false
  myGames = false
  form: FormGroup
  scrollLoading = false

  constructor(
    private gameHttpService: GameHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.form = new FormGroup({
          query: new FormControl(params.get('query') ?? '', Validators.required.bind(this)),
          myGames: new FormControl(params.get('myGames') === 'true'),
        })
        this.search()
      })
      .unsubscribe()
    this.form.valueChanges.pipe(debounceTime(250)).subscribe(() => {
      this.search()
      const queryParams: Params = this.form.value

      void this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        replaceUrl: true,
      })
    })
  }

  search(): void {
    this.loading = true
    this.gameHttpService
      .search(this.form.value, 0, 24)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.gamesCount = res.count
        this.games = res.data
      })
  }

  onScrollDown(): void {
    if (this.scrollLoading) {
      return
    }
    this.scrollLoading = true
    this.gameHttpService
      .search(this.form.value, this.games.length, 24)
      .pipe(finalize(() => (this.scrollLoading = false)))
      .subscribe((res) => {
        this.games = [...this.games, ...res.data]
      })
  }
}
