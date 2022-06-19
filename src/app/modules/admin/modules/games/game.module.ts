import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GameSearchComponent } from './components/game-search/game-search.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../../../shared/shared.module'
import { GameShowComponent } from './components/game-show/game-show.component'
import { MusicRowComponent } from './components/game-show/components/music-row/music-row.component'
import { AlternativeNameRowComponent } from './components/game-show/components/alternate-name-row/alternative-name-row.component'
import { ImportGameDialogComponent } from './components/game-search/import-game-dialog/import-game-dialog.component'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ConfirmMusicDeleteDialogComponent } from './components/game-show/components/confirm-music-delete-dialog/confirm-music-delete-dialog.component'

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
  declarations: [
    GameSearchComponent,
    GameShowComponent,
    MusicRowComponent,
    AlternativeNameRowComponent,
    ImportGameDialogComponent,
    ConfirmMusicDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    ScrollingModule,
    MatTooltipModule,
  ],
})
export class GameModule {}
