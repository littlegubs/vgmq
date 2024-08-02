import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { GameToMusic } from '../../../../../../../../../shared/models/game-to-music'
import { ConfirmMusicDeleteDialogComponent } from '../../confirm-music-delete-dialog/confirm-music-delete-dialog.component'
import { finalize } from 'rxjs/operators'
import { AdminGameHttpService } from '../../../../../../../../../core/http/admin-game-http.service'
import { MatDialog } from '@angular/material/dialog'
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-derived-music',
  templateUrl: './derived-music.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ]
})
export class DerivedMusicComponent implements OnInit {
  @Input() gameMusic: GameToMusic
  @Output() remove: EventEmitter<undefined> = new EventEmitter<undefined>()
  loading = false

  constructor(private gameHttpService: AdminGameHttpService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  delete(): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmMusicDeleteDialogComponent, {
      data: 'Are you sure you want to delete this relation?',
    })
    confirmDeleteDialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.loading = true
        this.gameHttpService
          .deleteGameMusic(this.gameMusic)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(() => {
            this.remove.emit()
          })
      }
    })
  }
}
