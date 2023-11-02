import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home.component'
import { SharedModule } from '../../shared/shared.module';
import { HomeLobbyComponent } from './components/home-lobby/home-lobby.component'

const routes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [HomeComponent, HomeLobbyComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {}
