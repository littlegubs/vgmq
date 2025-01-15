import { Component } from '@angular/core'
import { SystemHttpService } from '../../../../core/http/admin/system-http.service'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
})
export class SystemComponent {
  getListJobsLoading = false
  resetLobbiesLoading = false
  constructor(private http: SystemHttpService) {}

  listJobs(): void {
    this.getListJobsLoading = true
    this.http
      .listJobs()
      .pipe(
        finalize(() => {
          this.getListJobsLoading = false
        })
      )
      .subscribe((res) => {
        console.log(res)
      })
  }

  resetPublicLobbies(): void {
    this.resetLobbiesLoading = true
    this.http
      .resetPublicLobbies()
      .pipe(
        finalize(() => {
          this.resetLobbiesLoading = false
        })
      )
      .subscribe(() => {})
  }

  resetPrivateLobbies(): void {
    this.resetLobbiesLoading = true
    this.http
      .resetPrivateLobbies()
      .pipe(
        finalize(() => {
          this.resetLobbiesLoading = false
        })
      )
      .subscribe(() => {})
  }
}
