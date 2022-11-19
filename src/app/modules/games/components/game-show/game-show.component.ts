import { Component, Input, OnInit } from '@angular/core'
import { Game } from '../../../../shared/models/game'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { DateTime } from 'luxon'
import { GameToMusic, GameToMusicType } from '../../../../shared/models/game-to-music'
import { AlternativeName } from '../../../../shared/models/alternative-name'
import { ViewportScroller } from '@angular/common'
import { AuthService } from '../../../../core/services/auth.service'

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
})
export class GameShowComponent implements OnInit {
  game: Game
  loading = false
  @Input() set slug(slug: string) {
    this.loading = true
    this.gameHttpService.get(slug).subscribe((res) => {
      this.game = res
      this.loading = false
      // setTimeout(() => {
      //   this.viewportScroller.scrollToAnchor('sex')
      // }, 100)
    })
  }
  gameToMusicType = GameToMusicType
  isAdmin = false

  constructor(
    private gameHttpService: GameHttpService,
    private viewportScroller: ViewportScroller,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin
  }

  getDuration(gameToMusic: GameToMusic): Date {
    return DateTime.fromSeconds(gameToMusic.music.duration).toJSDate()
  }

  getEnabledAlternativeNames(): AlternativeName[] {
    return this.game.alternativeNames.filter((alternativeName) => alternativeName.enabled)
  }

  getGradientBackground():
    | {
        [klass: string]: any
      }
    | null
    | undefined {
    if (!this.game.cover) {
      return null
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.game.cover.colorPalette.backgroundColorHex)
    const rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }

    return {
      'background-image': `linear-gradient(to bottom, rgba(20, 21, 22, 0.70), rgba(20, 21, 22, 1) 150px), url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${this.game.cover.imageId}.jpg)`,
    }
  }
}
