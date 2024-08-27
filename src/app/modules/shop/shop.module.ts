import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { ShopComponent } from './shop.component'
import { BecomeArtistDialogComponent } from './become-artist-dialog/become-artist-dialog.component'

const routes: Routes = [{ path: '', component: ShopComponent }]

@NgModule({
  declarations: [ShopComponent, BecomeArtistDialogComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ShopModule {}
