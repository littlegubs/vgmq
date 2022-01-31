import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { GameShowComponent } from './components/game-show/game-show.component'
import { SharedModule } from '../../shared/shared.module'
import { GameListComponent } from './components/game-list/game-list.component'
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: ':slug',
    component: GameShowComponent,
  },
  {
    path: '',
    component: GameListComponent,
  },
]
@NgModule({
  declarations: [GameListComponent, GameShowComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MatIconModule],
})
export class GameModule {}
