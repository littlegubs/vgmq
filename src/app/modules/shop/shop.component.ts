import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { BecomeArtistDialogComponent } from './become-artist-dialog/become-artist-dialog.component'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  constructor(public dialog: MatDialog) {}

  openBecomeArtistDialog(): void {
    this.dialog.open(BecomeArtistDialogComponent)
  }
}
