import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyMusicHttpService } from '../../../../core/http/lobby-music.http.service'
import { CustomSocket } from '../../../../core/socket/custom.socket'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  audio?: HTMLAudioElement
  lobby: Lobby
  subscriptions: Subscription[] = []

  constructor(
    private lobbyStore: LobbyStore,
    private lobbyMusicHttpService: LobbyMusicHttpService,
    private socket: CustomSocket
  ) {}

  ngOnInit(): void {
    this.audio = new Audio()
    this.audio.volume = 0.5
    this.subscriptions = [
      this.lobbyStore.currentLobbyMusicId.subscribe((lobbyMusicId) => {
        if (lobbyMusicId !== null) {
          this.lobbyMusicHttpService.get(lobbyMusicId).subscribe((res) => {
            const reader = new FileReader()
            reader.onload = (e): void => {
              const srcUrl = e.target.result
              if (typeof srcUrl === 'string') {
                this.audio.src = srcUrl
                void this.audio.play()
              }
            }
            reader.readAsDataURL(res)
          })
        } else {
          this.audio.pause()
        }
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        if (lobby && lobby.status !== LobbyStatuses.PlayingMusic) {
          this.audio.pause()
        }
      }),
    ]
  }

  ngOnDestroy(): void {
    this.audio.pause()
    this.audio = undefined
    this.subscriptions.forEach((sb) => sb.unsubscribe())
    console.log('yoo')
  }
}
