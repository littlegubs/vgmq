import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../../../shared/shared.module'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { UsersAdminComponent } from './components/users-admin/users.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { UsersGraphComponent } from './components/users-graph/users-graph.component'
import { UsersTableComponent } from './components/users-table/users-table.component'
import { BanDialogComponent } from './components/users-table/ban-dialog/ban-dialog.component'

const routes: Routes = [
  {
    path: '',
    component: UsersAdminComponent,
  },
]
@NgModule({
  declarations: [UsersAdminComponent, UsersGraphComponent, UsersTableComponent, BanDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatProgressBarModule,
    ScrollingModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    NgApexchartsModule,
  ],
})
export class UserModule {}
