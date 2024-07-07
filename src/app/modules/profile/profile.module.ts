import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileComponent } from './profile.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component'

const routes: Routes = [{ path: '', component: ProfileComponent }]

@NgModule({
  declarations: [ProfileComponent, ConfirmDeleteDialogComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ProfileModule {}
