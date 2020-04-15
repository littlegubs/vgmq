import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../components/login/login.component'
import { SignupComponent } from '../components/signup/signup.component'
import { UserProfileComponent } from '../components/user-profile/user-profile.component'
import { AuthGuard } from '../services/auth.guard'

const routes: Routes = [
    { path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: 'log-in', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
