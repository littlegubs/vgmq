import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { AdminComponent } from './admin.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () => import('./modules/users/user.module').then((m) => m.UserModule),
      },
      {
        path: 'games',
        loadChildren: () => import('./modules/games/game.module').then((m) => m.GameModule),
      },
      {
        path: 'system',
        loadChildren: () => import('./modules/system/system.module').then((m) => m.SystemModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'users',
  },
]

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AdminModule {}
