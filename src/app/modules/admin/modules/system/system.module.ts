import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SystemComponent } from './system.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
  },
]

@NgModule({
  declarations: [SystemComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SystemModule {}
