import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'
import { AccountHttpService } from '../../core/http/account.http.service'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  IGDBUsername = ''
  success = false
  errorMessage: string | undefined
  loading = false

  constructor(private authService: AuthService, private accountHttpService: AccountHttpService) {}

  ngOnInit(): void {
    const jwtPayload = this.authService.decodeJwt()
    this.IGDBUsername = jwtPayload.IGDBUsername
  }

  updateGameList(): void {
    this.success = false
    this.errorMessage = undefined
    this.loading = true
    this.accountHttpService
      .updateGameList(this.IGDBUsername)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.success = true
        },
        (error) => {
          this.errorMessage = error
        }
      )
  }
}
