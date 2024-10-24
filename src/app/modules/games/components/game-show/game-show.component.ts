import { Component, Input, OnInit } from '@angular/core'
import { Game } from '../../../../shared/models/game'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { GameToMusicType } from '../../../../shared/models/game-to-music'
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

    return {
      'background-image': `linear-gradient(to bottom, rgba(20, 21, 22, 0.70), rgb(8 17 26 / var(--tw-bg-opacity)) 150px), url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${this.game.cover.imageId}.jpg)`,
    }
  }
}
