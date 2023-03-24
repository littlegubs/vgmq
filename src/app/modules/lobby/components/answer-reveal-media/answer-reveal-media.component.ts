import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LocalStorageHelper } from '../../../../core/helpers/local-storage-helper'
import { LobbyMusic } from '../../../../shared/models/lobby-music'

let apiLoaded = false

@Component({
  selector: 'app-answer-reveal-media',
  templateUrl: './answer-reveal-media.component.html',
})
export class AnswerRevealMediaComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  playerVars: YT.PlayerVars = {
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    rel: 0,
    modestbranding: 1,
  }
  mediaTypeOnReveal: number
  lobbyMusic: LobbyMusic | null = null
  currentScreenshotIndex = 0

  constructor(private lobbyStore: LobbyStore, private localStorageHelper: LocalStorageHelper) {
    this.mediaTypeOnReveal = localStorageHelper.getDefaultMediaTypeOnReveal()
    this.initYoutubePlayer()
    setTimeout(() => {
      this.currentScreenshotIndex = 1
    }, 5000)
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.currentLobbyMusicAnswer.subscribe((lobbyMusic) => {
        this.lobbyMusic = lobbyMusic
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  playVideo(event: YT.PlayerEvent): void {
    event.target.setPlaybackQuality('highres')
    event.target.mute()
    event.target.seekTo(this.lobbyMusic.startVideoAt, true)
  }

  private initYoutubePlayer(): void {
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
      apiLoaded = true
    }
  }
}
