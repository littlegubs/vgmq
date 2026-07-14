import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReportsComponent } from './reports.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ReportDialogComponent } from './report-dialog/report-dialog.component'
import { SharedModule } from '../../../../shared/shared.module'

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    ReportsComponent,
    ReportDialogComponent,
  ],
})
export class ReportsModule {}
