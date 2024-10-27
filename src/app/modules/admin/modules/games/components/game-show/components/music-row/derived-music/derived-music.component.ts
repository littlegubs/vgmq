import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GameToMusic } from '../../../../../../../../../shared/models/game-to-music'
import { finalize } from 'rxjs/operators'
import { AdminGameHttpService } from '../../../../../../../../../core/http/admin-game-http.service'
import { MatDialog } from '@angular/material/dialog'
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common'
import { ConfirmUnlinkDialogComponent } from '../../confirm-unlink-dialog/confirm-unlink-dialog.component'

@Component({
  selector: 'app-derived-music',
  templateUrl: './derived-music.component.html',
  standalone: true,
  imports: [RouterLink, NgIf],
})
export class DerivedMusicComponent {
  @Input() gameMusic: GameToMusic
  @Input() derivedGameToMusic!: GameToMusic
  @Output() remove: EventEmitter<undefined> = new EventEmitter<undefined>()
  loading = false

  constructor(private gameHttpService: AdminGameHttpService, private dialog: MatDialog) {}

  delete(): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmUnlinkDialogComponent, {
      data: this.derivedGameToMusic,
    })
    confirmDeleteDialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.loading = true
        this.gameHttpService
          .unlink(this.gameMusic.id, this.derivedGameToMusic.id)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(() => {
            this.remove.emit()
          })
      }
    })
  }
}
