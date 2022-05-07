import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RegisterModule } from './modules/register/register.module'
import { HomeThemeComponent } from './core/theme/home/home-theme.component'
import { AdminModule } from './modules/admin/admin.module'
import { AdminGuard } from './core/guards/admin.guard'
import { LobbyModule } from './modules/lobby/lobby.module'
import { GameModule } from './modules/games/game.module'
import { AnonGuard } from './core/guards/anon.guard'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeThemeComponent,
    children: [
      {
        path: 'register',
        loadChildren: (): Promise<RegisterModule> =>
          import('./modules/register/register.module').then((m) => m.RegisterModule),
        canActivate: [AnonGuard],
      },
      {
        path: 'games',
        loadChildren: (): Promise<GameModule> => import('./modules/games/game.module').then((m) => m.GameModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'lobby',
        loadChildren: (): Promise<LobbyModule> => import('./modules/lobby/lobby.module').then((m) => m.LobbyModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: (): Promise<AdminModule> => import('./modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
