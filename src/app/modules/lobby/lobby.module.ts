import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateComponent } from './components/create/create.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { LobbyHttpService } from '../../core/http/lobby.http.service'
import { LobbyComponent } from './lobby.component'
import { ConfigComponent } from './components/config/config.component'
import { WaitingComponent } from './waiting/waiting.component'
import { LobbyEventSourceService } from '../../core/services/lobby-event-source.service'
import { UsersComponent } from './components/users/users.component'
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component'

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
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [LobbyHttpService, LobbyEventSourceService],
})
export class LobbyModule {}
