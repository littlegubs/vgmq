import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountComponent } from './account.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { AccountHttpService } from '../../core/http/account.http.service'

const routes: Routes = [{ path: '', component: AccountComponent }]

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [AccountHttpService],
})
export class AccountModule {}
