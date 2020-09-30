import { Component } from '@angular/core'
import {Lobby} from '../../../shared/models/lobby';
import {LobbyHttpService} from '../../../core/http/lobby.http.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/reducers/index.reducer';

@Component({
  selector: 'app-lobby-playing',
  templateUrl: './playing.component.html',
})
export class PlayingComponent {
  lobby?: Lobby
  secondsLeft: number

  constructor(private lobbyHttpService: LobbyHttpService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('lobby').subscribe((res) => {
      this.lobby = res.lobby
      let audio = new Audio()
      audio.src = 'https://vgmq-musics.s3.eu-west-3.amazonaws.com/detroit-become-human-2018/05.+Hostage.mp3'
      audio.volume = 0.1
    })
  }

}
