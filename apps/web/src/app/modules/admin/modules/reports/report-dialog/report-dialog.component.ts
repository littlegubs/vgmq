import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { HttpClient } from '@angular/common/http'
import { LobbyReport } from '../reports.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from '../../../../../../environments/environment'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../../shared/shared.module'
import { finalize } from 'rxjs/operators'

export interface LobbyMessage {
  id: number
  content: string
  user: { id: number; username: string }
  createdAt: string
}

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule, MatDialogModule],
})
export class ReportDialogComponent implements OnInit {
  messages: LobbyMessage[] = []
  loading = true
  processing = false

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public report: LobbyReport,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http
      .get<LobbyMessage[]>(`${environment.apiEndpoint}/admin/reports/${this.report.id}/messages`)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (messages) => {
          this.messages = messages
        },
        error: () => {
          this.snackBar.open('Failed to load chat history', 'Close', { duration: 3000, panelClass: 'danger' })
        },
      })
  }

  deny(): void {
    if (!confirm('Are you sure you want to deny this report? This will delete the report and chat history.')) return

    this.processing = true
    this.http.delete(`${environment.apiEndpoint}/admin/reports/${this.report.id}/deny`).subscribe({
      next: () => {
        this.snackBar.open('Report denied and chat deleted', 'Close', { duration: 3000 })
        this.dialogRef.close(true)
      },
      error: () => {
        this.snackBar.open('Failed to deny report', 'Close', { duration: 3000, panelClass: 'danger' })
        this.processing = false
      },
    })
  }

  ban(): void {
    if (
      !confirm(
        `Are you sure you want to BAN ${this.report.reported.username}? This will also delete the report and chat history.`
      )
    )
      return

    this.processing = true
    this.http.post(`${environment.apiEndpoint}/admin/reports/${this.report.id}/ban`, {}).subscribe({
      next: () => {
        this.snackBar.open(`User ${this.report.reported.username} banned`, 'Close', { duration: 3000 })
        this.dialogRef.close(true)
      },
      error: () => {
        this.snackBar.open('Failed to ban user', 'Close', { duration: 3000, panelClass: 'danger' })
        this.processing = false
      },
    })
  }

  close(): void {
    this.dialogRef.close(false)
  }
}
