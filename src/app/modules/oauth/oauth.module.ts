import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { PatreonComponent } from './patreon/patreon.component'

const routes: Routes = [
  { path: 'patreon', component: PatreonComponent },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OauthModule {}
