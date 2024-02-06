import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core'
import { Subscription } from 'rxjs'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LocalStorageHelper } from '../../../../core/helpers/local-storage-helper'
import { LobbyMusic } from '../../../../shared/models/lobby-music'
import { YouTubePlayer } from '@angular/youtube-player'

@Component({
  selector: 'app-answer-reveal-media',
  templateUrl: './answer-reveal-media.component.html',
})
export class AnswerRevealMediaComponent implements OnInit, OnDestroy, AfterViewInit {
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
  @ViewChildren('youtubePlayer') youtubePlayer: QueryList<YouTubePlayer>

  constructor(private lobbyStore: LobbyStore, private localStorageHelper: LocalStorageHelper) {
    this.mediaTypeOnReveal = localStorageHelper.getDefaultMediaTypeOnReveal()
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

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.youtubePlayer.changes.subscribe({
        // for some reason, I need to use QueryList otherwise the child is always undefined
        next: (v: QueryList<YouTubePlayer>) => {
          v.first?.seekTo(this.lobbyMusic.startVideoAt, true)
          v.first?.mute()
        },
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}
