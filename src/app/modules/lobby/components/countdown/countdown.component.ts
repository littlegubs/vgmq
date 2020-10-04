import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '../../../../core/reducers/index.reducer'
import { Lobby } from '../../../../shared/models/lobby'
import { Observable, timer } from 'rxjs'
import { map, take } from 'rxjs/operators'

@Component({
  selector: 'app-lobby-countdown',
  templateUrl: './countdown.component.html',
})
export class CountdownComponent implements OnInit {
  lobby: Lobby
  counter: Observable<number>
  guessTime: number

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('lobby').subscribe((res) => {
      if (this.lobby !== undefined) {
        if (this.lobby.status !== res.lobby.status) {
          this.guessTime = res.lobby.guessTime
          this.counter = timer(0, 1000).pipe(
            take(this.guessTime),
            map(() => --this.guessTime)
          )
        }
      }
      this.lobby = res.lobby
    })
  }
}
