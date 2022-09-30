import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyMusicHttpService } from '../../../../core/http/lobby-music.http.service'
import { LobbySocket } from '../../../../core/socket/lobby.socket'
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
  nextAudioBuffer: ArrayBuffer

  constructor(
    private lobbyStore: LobbyStore,
    private lobbyMusicHttpService: LobbyMusicHttpService,
    private socket: LobbySocket,
    private audioContext: AudioContext
  ) {}

  ngOnInit(): void {
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = parseFloat(localStorage.getItem('audioPlayerVolume') ?? '0.5')
    this.gainNode.connect(this.audioContext.destination)
    this.subscriptions = [
      this.lobbyStore.currentLobbyAudioBuffer.subscribe(async (lobbyMusic) => {
        if (lobbyMusic !== null) {
          if (this.lobby.status === LobbyStatuses.AnswerReveal && this.lobby.playMusicOnAnswerReveal) {
            this.nextAudioBuffer = lobbyMusic
          } else {
            this.setSourceNull()
            await this.setSource(lobbyMusic)
          }
        } else {
          this.setSourceNull()
        }
        if (this.lobby?.status === LobbyStatuses.PlayingMusic) {
          this.gainNode.gain.value = parseFloat(localStorage.getItem('audioPlayerVolume') ?? '0.5')
          this.source?.start()
        }
      }),
      this.lobbyStore.lobby.subscribe(async (lobby) => {
        this.lobby = lobby
        if (lobby) {
          if (lobby.status === LobbyStatuses.AnswerReveal) {
            if (lobby.playMusicOnAnswerReveal) {
              setTimeout(() => {
                this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioContext.currentTime)
                this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 5)
              }, 5000)
            } else {
              this.setSourceNull()
            }
          }
          if (lobby.status === LobbyStatuses.PlayingMusic) {
            if (this.nextAudioBuffer) {
              this.setSourceNull()
              await this.setSource(this.nextAudioBuffer)
              this.nextAudioBuffer = undefined
            }
            this.gainNode.gain.value = parseFloat(localStorage.getItem('audioPlayerVolume') ?? '0.5')
            this.source?.start()
          }
          if (!lobby.playMusicOnAnswerReveal && lobby.status !== LobbyStatuses.PlayingMusic) {
            this.setSourceNull()
          }
          if (lobby.status === LobbyStatuses.Buffering) {
            this.setSourceNull()
          }
        }
      }),
      this.lobbyStore.resumeMusic.subscribe(async () => {
        await this.audioContext.resume()
        this.lobbyStore.setCanPlayMusic(this.audioContext.state === 'running')
      }),
    ]
  }

  ngOnDestroy(): void {
    this.setSourceNull()
    void this.audioContext.suspend()
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  getDefaultVolumeValue(): number {
    return parseFloat(localStorage.getItem('audioPlayerVolume') ?? '0.5')
  }

  updateVolume($event: MatSliderChange): void {
    this.gainNode.gain.value = $event.value
    localStorage.setItem('audioPlayerVolume', $event.value.toString())
  }

  async setSource(arrayBuffer: ArrayBuffer): Promise<void> {
    this.gainNode.gain.value = parseFloat(localStorage.getItem('audioPlayerVolume') ?? '0.5')
    const buffer = await this.audioContext.decodeAudioData(arrayBuffer)
    this.source = this.audioContext.createBufferSource()

    this.source.buffer = buffer
    this.source.connect(this.gainNode)
    this.lobbyStore.setCanPlayMusic(this.audioContext.state === 'running')
  }

  setSourceNull(): void {
    if (this.source) {
      this.source.buffer = null
    }
  }
}
