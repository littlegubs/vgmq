import { Component, OnInit } from '@angular/core'
import { OAuthHttpService } from '../../../core/http/oauth.http.service'
import { ActivatedRoute } from '@angular/router'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-oauth-patreon',
  standalone: true,
  imports: [],
  templateUrl: './patreon.component.html',
})
export class PatreonComponent implements OnInit {
  loading: boolean = false
  error: boolean = false
  userFullName: string

  constructor(private oAuthHttpService: OAuthHttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code')
    this.loading = true
    this.oAuthHttpService
      .patreon(code)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.userFullName = res.userFullName
        },
        error: () => {
          this.error = true
        },
      })
  }
}
