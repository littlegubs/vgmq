import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { UserStore } from '../../store/user.store'
import { AuthService } from '../../services/auth.service'
import { AuthHttpService } from '../../http/auth.http.service'
import { retry, timer } from 'rxjs'

@Component({
  selector: 'app-home-theme',
  templateUrl: './home-theme.component.html',
  standalone: false,
})
export class HomeThemeComponent implements OnInit {
  loggedIn = false
  isInMaintenance: boolean = false

  constructor(
    private userStore: UserStore,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private authHttpService: AuthHttpService
  ) {}

  ngOnInit(): void {
    this.authService.VGMQMaintenanceSubject.subscribe((isInMaintenance) => {
      if (isInMaintenance && !this.isInMaintenance) {
        this.isInMaintenance = isInMaintenance
        this.authHttpService
          .test()
          .pipe(
            retry({
              count: 200,
              delay: (_error, retryIndex) => {
                const interval = 200
                const delay = Math.pow(2, retryIndex - 1) * interval

                return timer(delay)
              },
            })
          )
          .subscribe(() => {
            this.authService.VGMQMaintenanceSubject.next(false)
          })
      }
      if (!isInMaintenance && this.isInMaintenance) {
        this.isInMaintenance = isInMaintenance
      }
    })
    this.userStore.userLoggedIn.subscribe((res) => {
      this.loggedIn = res
      this.cdr.detectChanges()
    })
  }
}
