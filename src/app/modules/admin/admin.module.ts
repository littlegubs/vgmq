import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'games',
    loadChildren: () => import('./modules/games/game.module').then((m) => m.GameModule),
  },
  {
    path: '**',
    redirectTo: 'games',
  },
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
