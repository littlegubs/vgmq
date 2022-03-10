import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { RegisterComponent } from './register.component'
import { LimitedAccessComponent } from './limited-access/limited-access.component'
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha'

const routes: Routes = [{ path: '', component: RegisterComponent }]

@NgModule({
  declarations: [RegisterComponent, LimitedAccessComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), RecaptchaFormsModule, RecaptchaModule],
})
export class RegisterModule {}
