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
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [LobbyHttpService],
})
export class LobbyModule {}
