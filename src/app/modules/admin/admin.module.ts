import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { GameModule } from './modules/games/game.module'

const routes: Routes = [
  {
    path: 'games',
    loadChildren: (): Promise<GameModule> => import('./modules/games/game.module').then((m) => m.GameModule),
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
