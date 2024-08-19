import { Component, Input } from '@angular/core'
import { GameToMusic, GameToMusicType } from '../../../../../shared/models/game-to-music'
import { DateTime } from 'luxon'
import { GameAlbum } from '../../../../../shared/models/game-album'
import { DatePipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-game-album',
  standalone: true,
  imports: [DatePipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage],
  templateUrl: './game-album.component.html',
})
export class GameAlbumComponent {
  gameToMusicType = GameToMusicType

  @Input() album?: GameAlbum | undefined
  @Input() gameToMusics?: GameToMusic[] | undefined
  cdnUrl = environment.cdnUrl

  getDuration(gameToMusic: GameToMusic): Date {
    return DateTime.fromSeconds(gameToMusic.music.duration).toJSDate()
  }

  getGameToMusic(): GameToMusic[] {
    return this.album ? this.album.musics : this.gameToMusics
  }

  showDisk(i: number, gameToMusic: GameToMusic): boolean {
    const previousGameToMusic = this.getGameToMusic()[i - 1]

    return (
      (i - 1 === -1 ||
        (previousGameToMusic.disk ?? previousGameToMusic.music.disk) !==
          (gameToMusic.disk ?? gameToMusic.music.disk)) &&
      (gameToMusic.disk ?? gameToMusic.music.disk) !== null
    )
  }
}
