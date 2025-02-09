import { Component } from '@angular/core'
import { SystemHttpService } from '../../../../core/http/admin/system-http.service'
import { finalize } from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
})
export class SystemComponent {
  getListJobsLoading = false
  resetPublicLobbiesLoading = false
  resetPrivateLobbiesLoading = false
  lobbyMessageLoading = false
  lobbyMessage = new FormControl<string>('')
  constructor(private http: SystemHttpService, private lobbyHttpService: LobbyHttpService) {}

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
    this.resetPublicLobbiesLoading = true
    this.http
      .resetPublicLobbies()
      .pipe(
        finalize(() => {
          this.resetPublicLobbiesLoading = false
        })
      )
      .subscribe(() => {})
  }

  resetPrivateLobbies(): void {
    this.resetPrivateLobbiesLoading = true
    this.http
      .resetPrivateLobbies()
      .pipe(
        finalize(() => {
          this.resetPrivateLobbiesLoading = false
        })
      )
      .subscribe(() => {})
  }

  sendMessageToLobbies(): void {
    this.lobbyMessageLoading = true
    this.lobbyHttpService
      .sendMessageToLobbies(this.lobbyMessage.value)
      .pipe(
        finalize(() => {
          this.lobbyMessageLoading = false
        })
      )
      .subscribe(() => {
        this.lobbyMessage.setValue('')
      })
  }
}
