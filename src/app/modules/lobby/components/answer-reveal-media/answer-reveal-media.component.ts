import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LocalStorageHelper } from '../../../../core/helpers/local-storage-helper'

let apiLoaded = false

@Component({
  selector: 'app-answer-reveal-media',
  templateUrl: './answer-reveal-media.component.html',
})
export class AnswerRevealMediaComponent implements OnInit, OnDestroy {
  lobby?: Lobby | null
  subscriptions: Subscription[] = []
  lobbyStatuses = LobbyStatuses
  videoId?: string | null
  playerVars: YT.PlayerVars
  mediaTypeOnReveal: number
  musicImageSrc = 'https://media.tenor.com/KNk6VTWoVrMAAAAC/mario-sonic.gif'

  constructor(private lobbyStore: LobbyStore, private localStorageHelper: LocalStorageHelper) {
    this.mediaTypeOnReveal = localStorageHelper.getDefaultMediaTypeOnReveal()
    this.initYoutubePlayer()
    this.playerVars = {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
    }
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        console.log(lobby)
      }),

      this.lobbyStore.currentLobbyMusicAnswer.subscribe((lobbyMusic) => {
        console.log(lobbyMusic)
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  playVideo(event: YT.PlayerEvent): void {
    console.log(event)
    const embedCode = event.target.getVideoEmbedCode()
    event.target.mute()
    event.target.playVideo()
    if (document.getElementById('embed-code')) {
      document.getElementById('embed-code').innerHTML = embedCode
    }
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
