import { Component, OnInit } from '@angular/core'
import { Lobby } from '../../../../shared/models/lobby'

@Component({
  selector: 'app-lobby-center-container',
  templateUrl: './center-container.component.html',
})
export class CenterContainerComponent implements OnInit {
  lobby: Lobby
  constructor() {}

  ngOnInit(): void {
    // this.store.select('lobby').subscribe((res) => {
    //   this.lobby = res.lobby
    // })
  }
}
