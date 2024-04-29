import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./modules/users/user.module').then((m) => m.UserModule),
  },
  {
    path: 'games',
    loadChildren: () => import('./modules/games/game.module').then((m) => m.GameModule),
  },
  {
    path: '**',
    redirectTo: 'users',
  },
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
