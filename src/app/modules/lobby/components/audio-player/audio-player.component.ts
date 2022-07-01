import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyMusicHttpService } from '../../../../core/http/lobby-music.http.service'
import { CustomSocket } from '../../../../core/socket/custom.socket'
import { Subscription } from 'rxjs'
import { IGainNode } from 'standardized-audio-context/src/interfaces/gain-node'
import { AudioContext, IAudioContext } from 'angular-audio-context'
import { MatSliderChange } from '@angular/material/slider'
import { IAudioBufferSourceNode } from 'standardized-audio-context/src/interfaces/audio-buffer-source-node'

@Component({
  selector: 'app-lobby-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  audio?: HTMLAudioElement
  lobby: Lobby
  subscriptions: Subscription[] = []
  gainNode: IGainNode<any>
  source: IAudioBufferSourceNode<IAudioContext>

  constructor(
    private lobbyStore: LobbyStore,
    private lobbyMusicHttpService: LobbyMusicHttpService,
    private socket: CustomSocket,
    private audioContext: AudioContext
  ) {}

  ngOnInit(): void {
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = parseFloat(localStorage.getItem('audioPlayerVolume') ?? '0.5')
    this.gainNode.connect(this.audioContext.destination)
    this.subscriptions = [
      this.lobbyStore.currentLobbyAudioBuffer.subscribe(async (lobbyMusicId) => {
        if (lobbyMusicId !== null) {
          await this.audioContext.resume()
          const buffer = await this.audioContext.decodeAudioData(lobbyMusicId)
          this.source = this.audioContext.createBufferSource()

          this.source.buffer = buffer
          this.source.connect(this.gainNode)
          this.source.start()
        } else {
          this.source?.stop()
        }
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        if (lobby && lobby.status !== LobbyStatuses.PlayingMusic) {
          this.source?.stop()
        }
      }),
    ]
  }

  ngOnDestroy(): void {
    this.source?.stop()
    void this.audioContext.suspend()
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  updateVolume($event: MatSliderChange): void {
    this.gainNode.gain.value = $event.value
    localStorage.setItem('audioPlayerVolume', $event.value.toString())
  }
}
