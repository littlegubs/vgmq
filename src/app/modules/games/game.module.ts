import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { GameShowComponent } from './components/game-show/game-show.component'
import { SharedModule } from '../../shared/shared.module'
import { GameListComponent } from './components/game-list/game-list.component'
import { MatIconModule } from '@angular/material/icon'
import { ImportGameDialogComponent } from './components/game-list/import-game-dialog/import-game-dialog.component'
import { MatSelectModule } from '@angular/material/select'
import { GameAlbumComponent } from './components/game-show/game-album/game-album.component'

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
  declarations: [GameListComponent, GameShowComponent, ImportGameDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatIconModule,
    MatSelectModule,
    GameAlbumComponent,
  ],
})
export class GameModule {}
