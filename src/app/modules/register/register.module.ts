import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { RegisterComponent } from './register.component'
import { LimitedAccessComponent } from './limited-access/limited-access.component'
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha'
import { ConfirmationComponent } from './confirmation/confirmation.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: ':token', component: ConfirmationComponent },
]

@NgModule({
  declarations: [RegisterComponent, LimitedAccessComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    RecaptchaFormsModule,
    RecaptchaModule,
    MatSnackBarModule,
  ],
})
export class RegisterModule {}
