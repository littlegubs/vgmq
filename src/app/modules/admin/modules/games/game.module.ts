import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../../../shared/shared.module'
import { GameShowComponent } from './components/game-show/game-show.component'
import { MusicRowComponent } from './components/game-show/components/music-row/music-row.component'
import { AlternativeNameRowComponent } from './components/game-show/components/alternate-name-row/alternative-name-row.component'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ConfirmMusicDeleteDialogComponent } from './components/game-show/components/confirm-music-delete-dialog/confirm-music-delete-dialog.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { DerivedMusicDialogComponent } from './components/game-show/components/derived-music-dialog/derived-music-dialog.component'
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop'
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { ConfirmUnlinkDialogComponent } from './components/game-show/components/confirm-unlink-dialog/confirm-unlink-dialog.component'
import { LinkDialogComponent } from './components/game-show/components/link-dialog/link-dialog.component'

const routes: Routes = [
  {
    path: ':slug',
    component: GameShowComponent,
  },
]
@NgModule({
  declarations: [
    GameShowComponent,
    AlternativeNameRowComponent,
    ConfirmMusicDeleteDialogComponent,
    ConfirmUnlinkDialogComponent,
    LinkDialogComponent,
    DerivedMusicDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatProgressBarModule,
    ScrollingModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    MatTabGroup,
    MatTab,
    MusicRowComponent,
  ],
})
export class GameModule {}
