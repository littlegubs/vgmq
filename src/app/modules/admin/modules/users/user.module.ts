import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../../../shared/shared.module'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { UsersStatsComponent } from './users.component'
import { NgApexchartsModule } from 'ng-apexcharts'

const routes: Routes = [
  {
    path: '',
    component: UsersStatsComponent,
  },
]
@NgModule({
  declarations: [UsersStatsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    ScrollingModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    NgApexchartsModule,
  ],
})
export class UserModule {}
