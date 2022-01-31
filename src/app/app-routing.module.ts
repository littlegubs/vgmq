import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { HomeModule } from './modules/home/home.module'
import { LoginModule } from './modules/login/login.module'
import { RegisterModule } from './modules/register/register.module'
import { AnonGuard } from './core/guards/anon.guard'
import { HomeThemeComponent } from './core/theme/home/home-theme.component'
import { AdminModule } from './modules/admin/admin.module'
import { AdminGuard } from './core/guards/admin.guard'
import { LobbyModule } from './modules/lobby/lobby.module'
import { GameModule } from './modules/games/game.module'

const routes: Routes = [
  {
    path: 'login',
    loadChildren: (): Promise<LoginModule> => import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [AnonGuard],
  },
  {
    path: 'register',
    loadChildren: (): Promise<RegisterModule> =>
      import('./modules/register/register.module').then((m) => m.RegisterModule),
    canActivate: [AnonGuard],
  },
  {
    path: '',
    component: HomeThemeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: (): Promise<HomeModule> => import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'games',
        loadChildren: (): Promise<GameModule> => import('./modules/games/game.module').then((m) => m.GameModule),
      },
      {
        path: 'lobby',
        loadChildren: (): Promise<LobbyModule> => import('./modules/lobby/lobby.module').then((m) => m.LobbyModule),
      },
      {
        path: 'admin',
        loadChildren: (): Promise<AdminModule> => import('./modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
