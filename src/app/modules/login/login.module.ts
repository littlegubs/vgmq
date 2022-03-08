import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login.component'
import { SharedModule } from '../../shared/shared.module'
import {RecaptchaModule} from "ng-recaptcha";

const routes: Routes = [{ path: '', component: LoginComponent }]

@NgModule({
  declarations: [LoginComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes), RecaptchaModule],
})
export class LoginModule {}
