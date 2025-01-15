import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeThemeComponent } from './core/theme/home/home-theme.component'
import { AdminGuard } from './core/guards/admin.guard'
import { AnonGuard } from './core/guards/anon.guard'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeThemeComponent,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./modules/register/register.module').then((m) => m.RegisterModule),
        canActivate: [AnonGuard],
      },
      {
        path: 'auth-callback',
        loadChildren: () => import('./modules/oauth/oauth.module').then((m) => m.OauthModule),
        canActivate: [AnonGuard],
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./modules/reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
        canActivate: [AnonGuard],
      },
      {
        path: 'games',
        loadChildren: () => import('./modules/games/game.module').then((m) => m.GameModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'lobby',
        loadChildren: () => import('./modules/lobby/lobby.module').then((m) => m.LobbyModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'oauth',
        loadChildren: () => import('./modules/oauth/oauth.module').then((m) => m.OauthModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
