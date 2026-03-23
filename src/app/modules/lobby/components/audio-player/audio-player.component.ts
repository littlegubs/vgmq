import { Component, OnDestroy, OnInit } from '@angular/core'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { map, Subscription } from 'rxjs'
import { LocalStorageHelper } from '../../../../core/helpers/local-storage-helper'
import { LobbyUser, LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-lobby-audio-player',
  templateUrl: './audio-player.component.html',
  standalone: false,
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
  audioVisualizerStatus: boolean
  meIsPremium: boolean = false
  lobbyUser: LobbyUser

  readonly lobbyStatuses = LobbyStatuses
  readonly LobbyUserRoles = LobbyUserRoles

  constructor(private lobbyStore: LobbyStore, private localStorageHelper: LocalStorageHelper) {}

  ngOnInit(): void {
    this.lobbyStore.me.subscribe((me) => {
      if (me !== null) {
        this.lobbyUser = me
        this.meIsPremium = me.user.premium
      }
    })

    this.lobbyStore.setCurrentLobbyAudioContext(this.audioContext)
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
    this.mediaTypeOnReveal = this.localStorageHelper.getDefaultMediaTypeOnReveal()
    this.audioVisualizerStatus = this.localStorageHelper.getAudioVisualizerStatus()
    this.gainNode.connect(this.audioContext.destination)
    this.lobbyStore.setCurrentLobbyGainNode(this.gainNode)

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
          this.cancelFadeOut()
          this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
          this.lobbyStore.setCurrentLobbyGainNode(this.gainNode)
          this.source?.start()
        }
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
      }),
      // 2. ISOLATED STREAM: Only trigger when 'isPaused' actually changes
      this.lobbyStore.lobby
        .pipe(
          map((lobby) => lobby?.isPaused),
          distinctUntilChanged()
        )
        .subscribe((isPaused) => {
          if (isPaused === undefined) return

          if (isPaused && this.audioContext.state === 'running') {
            void this.audioContext.suspend()
          } else if (!isPaused && this.audioContext.state === 'suspended') {
            void this.audioContext.resume()
          }
        }),
      this.lobbyStore.lobby
        .pipe(
          distinctUntilChanged(
            (prev, curr) =>
              prev?.status === curr?.status && prev?.playMusicOnAnswerReveal === curr?.playMusicOnAnswerReveal
          )
        )
        .subscribe(async (lobby) => {
          if (!lobby) return
          if (lobby.status === LobbyStatuses.AnswerReveal) {
            if (lobby.playMusicOnAnswerReveal) {
              // --- NEW FADE-OUT LOGIC ---
              this.cancelFadeOut() // Clear any existing schedules first

              const now = this.audioContext.currentTime
              const currentVolume = this.gainNode.gain.value

              // 1. Anchor the current volume so it doesn't drop immediately
              this.gainNode.gain.setValueAtTime(currentVolume, now)
              // 2. Wait 5 seconds by holding the volume steady until now + 5
              this.gainNode.gain.setValueAtTime(currentVolume, now + 5)
              // 3. Ramp down over the *next* 5 seconds (ends at now + 10)
              this.gainNode.gain.exponentialRampToValueAtTime(0.01, now + 10)

              this.lobbyStore.setCurrentLobbyGainNode(this.gainNode)
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
            this.cancelFadeOut()
            this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
            this.lobbyStore.setCurrentLobbyGainNode(this.gainNode)
            this.source?.start()
          }

          if (!lobby.playMusicOnAnswerReveal && lobby.status !== LobbyStatuses.PlayingMusic) {
            this.setSourceNull()
          }
          if (lobby.status === LobbyStatuses.Buffering) {
            this.setSourceNull()
          }
        }),

      this.lobbyStore.resumeMusic.subscribe(async () => {
        await this.audioContext.resume()
        this.lobbyStore.setCanPlayMusic(this.audioContext.state === 'running')
      }),
    ]
  }

  cancelFadeOut(): void {
    this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime)
  }

  ngOnDestroy(): void {
    this.setSourceNull()
    void this.audioContext.suspend()
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  async setSource(arrayBuffer: ArrayBuffer): Promise<void> {
    this.cancelFadeOut() // Ensure fresh sources don't inherit old fadeouts
    this.gainNode.gain.setValueAtTime(this.getDefaultVolumeValue(), this.audioContext.currentTime)
    this.lobbyStore.setCurrentLobbyGainNode(this.gainNode)
    const buffer = await this.audioContext.decodeAudioData(arrayBuffer)
    this.source = this.audioContext.createBufferSource()

    this.source.buffer = buffer
    this.source.connect(this.gainNode)
    this.lobbyStore.setCanPlayMusic(this.audioContext.state === 'running')
    this.lobbyStore.setCurrentLobbySource(this.source)
  }

  setSourceNull(): void {
    if (this.source) {
      this.source.buffer = null
    }
  }

  getDefaultVolumeValue(): number {
    return this.localStorageHelper.getDefaultVolume()
  }

  updateVolume(volume: number): void {
    this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime)
    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    this.localStorageHelper.setDefaultVolume(volume)
    this.lobbyStore.setCurrentLobbyGainNode(this.gainNode)
  }

  getDefaultMediaTypeOnReveal(): number {
    return this.localStorageHelper.getDefaultMediaTypeOnReveal()
  }

  updateMediaTypeOnReveal($event: number): void {
    this.mediaTypeOnReveal = $event
    this.localStorageHelper.setDefaultMediaTypeOnReveal($event)
  }

  setAudioVisualizerStatus(): void {
    this.audioVisualizerStatus = !this.audioVisualizerStatus
    this.localStorageHelper.setAudioVisualizerStatus(this.audioVisualizerStatus)
  }

  protected showSkipButton(): boolean {
    if ([LobbyStatuses.Loading, LobbyStatuses.Buffering].includes(this.lobby.status)) {
      return false
    }
    if (!this.lobby.allowVoteSkipGuessing && this.lobby.status === LobbyStatuses.PlayingMusic) {
      return false
    }
    if (!this.lobby.allowVoteSkipAnswerReveal && this.lobby.status === LobbyStatuses.AnswerReveal) {
      return false
    }

    return true
  }
}
