import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatDialog } from '@angular/material/dialog'
import { ReportDialogComponent } from './report-dialog/report-dialog.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from '../../../../../environments/environment'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../shared/shared.module'
import { finalize } from 'rxjs/operators'

export enum ReportStatus {
  Pending = 'pending',
  Banned = 'banned',
  Denied = 'denied',
}

export interface LobbyReport {
  id: number
  lobbyId: number
  reporter: { id: number; username: string }
  reported: { id: number; username: string }
  status: ReportStatus
  updatedBy: { id: number; username: string } | null
  createdAt: string
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class ReportsComponent implements OnInit {
  pendingReports: LobbyReport[] = []
  handledReports: LobbyReport[] = []
  loading = true
  ReportStatus = ReportStatus

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadReports()
  }

  loadReports(): void {
    this.loading = true
    this.http
      .get<LobbyReport[]>(`${environment.apiEndpoint}/admin/reports`)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (reports) => {
          this.pendingReports = reports.filter((r) => r.status === ReportStatus.Pending)
          this.handledReports = reports.filter((r) => r.status !== ReportStatus.Pending)
        },
        error: () => {
          this.snackBar.open('Failed to load reports', 'Close', { duration: 3000, panelClass: 'danger' })
        },
      })
  }

  openReport(report: LobbyReport): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '800px',
      data: report,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadReports()
      }
    })
  }
}
