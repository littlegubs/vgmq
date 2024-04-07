import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import { LocalStorageHelper } from '../../../../core/helpers/local-storage-helper'

@Component({
  selector: 'app-lobby-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  audio?: HTMLAudioElement
  lobby: Lobby
  subscriptions: Subscription[] = []
  gainNode: GainNode
  source: AudioBufferSourceNode
  nextAudioBuffer: ArrayBuffer
  mediaTypeOnReveal: number
  audioContext = new AudioContext()

  constructor(private lobbyStore: LobbyStore, private localStorageHelper: LocalStorageHelper) {}

  ngOnInit(): void {
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
    this.mediaTypeOnReveal = this.localStorageHelper.getDefaultMediaTypeOnReveal()
    this.gainNode.connect(this.audioContext.destination)
    this.subscriptions = [
      this.lobbyStore.currentLobbyAudioBuffer.subscribe(async (lobbyMusic) => {
        if (lobbyMusic !== null) {
          if (this.lobby.status === LobbyStatuses.AnswerReveal && this.lobby.playMusicOnAnswerReveal) {
            this.nextAudioBuffer = lobbyMusic
          } else {
            this.source?.stop()
            this.setSourceNull()
            await this.setSource(lobbyMusic)
          }
        } else {
          this.setSourceNull()
        }
        if (this.lobby?.status === LobbyStatuses.PlayingMusic) {
          this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
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
              this.source?.stop()
              this.setSourceNull()
              await this.setSource(this.nextAudioBuffer)
              this.nextAudioBuffer = undefined
            }
            this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
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

  async setSource(arrayBuffer: ArrayBuffer): Promise<void> {
    this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
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

  getDefaultVolumeValue(): number {
    return this.localStorageHelper.getDefaultVolume()
  }

  updateVolume(target: EventTarget): void {
    // @ts-ignore
    const volume = target.valueAsNumber as number
    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    this.localStorageHelper.setDefaultVolume(volume)
  }

  getDefaultMediaTypeOnReveal(): number {
    return this.localStorageHelper.getDefaultMediaTypeOnReveal()
  }

  updateMediaTypeOnReveal($event: number): void {
    this.mediaTypeOnReveal = $event
    this.localStorageHelper.setDefaultMediaTypeOnReveal($event)
  }
}
