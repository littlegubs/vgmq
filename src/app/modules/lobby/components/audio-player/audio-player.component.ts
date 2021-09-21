import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby } from '../../../../shared/models/lobby'

@Component({
  selector: 'app-lobby-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  audio: HTMLAudioElement
  lobby: Lobby

  constructor() {}

  ngOnInit(): void {
    // this.store.select('lobby').subscribe((res) => {
    //   if (this.lobby !== undefined) {
    //     if (this.lobby.status !== res.lobby.status) {
    //       if (res.lobby.currentMusic !== undefined) {
    //         if (this.audio !== undefined) {
    //           this.audio.pause()
    //         }
    //         this.audio = new Audio()
    //         this.audio.src = res.lobby.currentMusic.music.awsUrl
    //         this.audio.volume = 0.1
    //         this.audio.currentTime = res.lobby.currentMusic.startAt
    //         void this.audio.play()
    //       } else {
    //         this.audio?.pause()
    //       }
    //     }
    //   }
    //
    //   this.lobby = res.lobby
    // })
  }

  ngOnDestroy(): void {
    this.audio?.pause()
  }
}
