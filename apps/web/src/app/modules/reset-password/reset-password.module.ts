import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { RequestResetPasswordComponent } from './request/request-reset-password.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ResetPasswordComponent } from './reset-password.component'

const routes: Routes = [
  { path: '', component: RequestResetPasswordComponent },
  { path: ':token', component: ResetPasswordComponent },
]

@NgModule({
  declarations: [RequestResetPasswordComponent, ResetPasswordComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), MatSnackBarModule],
})
export class ResetPasswordModule {}
