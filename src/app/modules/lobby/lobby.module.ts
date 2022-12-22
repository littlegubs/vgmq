import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateComponent } from './create/create.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { LobbyComponent } from './lobby.component'
import { ConfigComponent } from './components/config/config.component'
import { WaitingComponent } from './waiting/waiting.component'
import { UsersComponent } from './components/users/users.component'
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component'
import { ButtonPlayComponent } from './components/button-play/button-play.component'
import { PlayingComponent } from './playing/playing.component'
import { AudioPlayerComponent } from './components/audio-player/audio-player.component'
import { AnswerSelectComponent } from './components/answer-select/answer-select.component'
import { CountdownComponent } from './components/countdown/countdown.component'
import { CenterContainerComponent } from './components/center-container/center-container.component'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatRadioModule } from '@angular/material/radio'
import { MatTooltipModule } from '@angular/material/tooltip'
import { AudioContextModule } from 'angular-audio-context'
import { InformationComponent } from './components/information/information.component'
import { AnswerRevealComponent } from './components/answer-reveal/answer-reveal.component'
import { MatIconModule } from '@angular/material/icon'
import { CountdownProgressComponent } from './components/countdown-progress/countdown-progress.component'
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip'
import { ScoreComponent } from './components/score/score.component'
import { ScoreRowComponent } from './components/score/score-row.component'
import { LobbyStore } from '../../core/store/lobby.store'
import { ChatComponent } from './components/chat/chat.component'
import { HintModeToggleComponent } from './components/hint-mode-toggle/hint-mode-toggle.component'
import { HintModeComponent } from './components/hint-mode/hint-mode.component'
import { MatSelectModule } from '@angular/material/select'

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: ':code', component: LobbyComponent },
  {
    path: '**',
    redirectTo: 'create',
  },
]
@NgModule({
  declarations: [
    CreateComponent,
    LobbyComponent,
    ConfigComponent,
    WaitingComponent,
    UsersComponent,
    PasswordDialogComponent,
    ButtonPlayComponent,
    PlayingComponent,
    AudioPlayerComponent,
    AnswerSelectComponent,
    CountdownComponent,
    CenterContainerComponent,
    InformationComponent,
    AnswerRevealComponent,
    CountdownProgressComponent,
    ScoreComponent,
    ScoreRowComponent,
    ChatComponent,
    HintModeToggleComponent,
    HintModeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSliderModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTooltipModule,
    AudioContextModule.forRoot('balanced'),
    MatIconModule,
    MdbTooltipModule,
    MatSelectModule,
  ],
  providers: [LobbyHttpService, LobbyStore],
})
export class LobbyModule {}
