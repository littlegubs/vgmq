import { Component, Input } from '@angular/core'
import { Lobby } from '../../../../shared/models/lobby'
import { PasswordDialogComponent } from '../../../lobby/components/password-dialog/password-dialog.component'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-home-lobby',
  templateUrl: './home-lobby.component.html',
  standalone: false,
})
export class HomeLobbyComponent {
  @Input() lobby!: Lobby

  constructor(private router: Router, private dialog: MatDialog) {}
  joinLobby(): void {
    if (this.lobby.hasPassword) {
      const passwordDialog = this.dialog.open(PasswordDialogComponent, {
        data: this.lobby.code,
      })
      passwordDialog.afterClosed().subscribe((res: Lobby | undefined) => {
        if (res) {
          void this.router.navigate([`/lobby/${res.code}`])
        }
      })
    } else {
      void this.router.navigate([`/lobby/${this.lobby.code}`])
    }
  }

  getDifficultyTitle(): string {
    return `Difficulty : ${this.lobby.difficulty.join(', ')}`
  }
}
