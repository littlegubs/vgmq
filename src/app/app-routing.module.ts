import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { HomeModule } from './modules/home/home.module'
import { LoginModule } from './modules/login/login.module'
import { RegisterModule } from './modules/register/register.module'
import { AnonGuard } from './core/guards/anon.guard'
import { HomeThemeComponent } from './core/theme/home/home-theme.component'

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
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
