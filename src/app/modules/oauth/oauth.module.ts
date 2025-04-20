import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { OauthComponent } from './oauth.component'
import { AuthGuard } from '../../core/guards/auth.guard'
import { AnonGuard } from '../../core/guards/anon.guard'

const routes: Routes = [
  {
    path: 'patreon',
    loadComponent: () => import('./patreon/patreon.component').then((m) => m.PatreonComponent),
    canActivate: [AuthGuard],
  },
  { path: 'google', component: OauthComponent, canActivate: [AnonGuard] },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  declarations: [OauthComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OauthModule {}
