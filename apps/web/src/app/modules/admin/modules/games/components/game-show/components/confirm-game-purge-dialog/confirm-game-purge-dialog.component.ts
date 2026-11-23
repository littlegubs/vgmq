import { Component } from '@angular/core'
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-confirm-music-delete-dialog',
  templateUrl: './confirm-game-purge-dialog.component.html',
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButton],
})
export class ConfirmGamePurgeDialogComponent {
  constructor() {}
}
