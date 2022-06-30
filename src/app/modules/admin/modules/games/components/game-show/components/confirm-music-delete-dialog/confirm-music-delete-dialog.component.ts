import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { GameToMusic, GameToMusicType } from '../../../../../../../../shared/models/game-to-music'

@Component({
  selector: 'app-confirm-music-delete-dialog',
  templateUrl: './confirm-music-delete-dialog.component.html',
})
export class ConfirmMusicDeleteDialogComponent implements OnInit {
  gameToMusic: GameToMusic
  gameToMusicType = GameToMusicType

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameToMusic) {}

  ngOnInit(): void {
    this.gameToMusic = this.data
  }
}
