import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyMusicHttpService } from '../../../../core/http/lobby-music.http.service'

@Component({
  selector: 'app-lobby-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  audio: HTMLAudioElement
  lobby: Lobby

  constructor(private lobbyStore: LobbyStore, private lobbyMusicHttpService: LobbyMusicHttpService) {}

  ngOnInit(): void {
    this.audio = new Audio()
    this.lobbyMusicHttpService.get('3').subscribe((res) => {
      console.log(res)
      const reader = new FileReader()
      reader.onload = (e): void => {
        const srcUrl = e.target.result
        if (typeof srcUrl === 'string') {
          this.audio.src = srcUrl
          this.audio.volume = 0.1
          void this.audio.play()
        }
      }
      reader.readAsDataURL(res)
      // this.audio.src = res
      // this.audio.volume = 0.1
      // void this.audio.play()
    })
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

  play() {
    this.audio = new Audio()
    this.lobbyMusicHttpService.get('3').subscribe((res) => {
      console.log(res)
      const reader = new FileReader()
      reader.onload = (e): void => {
        const srcUrl = e.target.result
        if (typeof srcUrl === 'string') {
          this.audio.src = srcUrl
          this.audio.volume = 0.1
          void this.audio.play()
        }
      }
      reader.readAsDataURL(res)
      // this.audio.src = res
      // this.audio.volume = 0.1
      // void this.audio.play()
    })
  }
}
