import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common'
import { GameSearchComponent } from './components/game-search/game-search.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../../../shared/shared.module'
import { GameShowComponent } from './components/game-show/game-show.component'
import { MusicRowComponent } from './components/game-show/components/music-row/music-row.component'

const routes: Routes = [
  {
    path: ':slug',
    component: GameShowComponent,
  },
  {
    path: '',
    component: GameSearchComponent,
  },
]
@NgModule({
  declarations: [GameSearchComponent, GameShowComponent, MusicRowComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class GameModule {}
