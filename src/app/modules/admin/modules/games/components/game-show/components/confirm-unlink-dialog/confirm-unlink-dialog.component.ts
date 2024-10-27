import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { GameToMusic } from '../../../../../../../../shared/models/game-to-music'

@Component({
  selector: 'app-confirm-unlink-dialog',
  templateUrl: './confirm-unlink-dialog.component.html',
})
export class ConfirmUnlinkDialogComponent implements OnInit {
  gameToMusic: GameToMusic

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameToMusic) {}

  ngOnInit(): void {
    this.gameToMusic = this.data
  }
}
