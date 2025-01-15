import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { OauthComponent } from './oauth.component'

const routes: Routes = [{ path: '', component: OauthComponent }]

@NgModule({
  declarations: [OauthComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OauthModule {}
