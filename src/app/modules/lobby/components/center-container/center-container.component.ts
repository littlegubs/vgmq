import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '../../../../core/reducers/index.reducer'
import { Lobby } from '../../../../shared/models/lobby'

@Component({
  selector: 'app-lobby-center-container',
  templateUrl: './center-container.component.html',
})
export class CenterContainerComponent implements OnInit {
  lobby: Lobby
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('lobby').subscribe((res) => {
      this.lobby = res.lobby
    })
  }
}
