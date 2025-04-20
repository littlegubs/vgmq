import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { RegisterComponent } from './register.component'
import { ConfirmationComponent } from './confirmation/confirmation.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: ':token', component: ConfirmationComponent },
]

@NgModule({
  declarations: [RegisterComponent, ConfirmationComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), MatSnackBarModule],
})
export class RegisterModule {}
