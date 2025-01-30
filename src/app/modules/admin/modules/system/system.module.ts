import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SystemComponent } from './system.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../../../shared/shared.module'

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
  },
]

@NgModule({
  declarations: [SystemComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class SystemModule {}
