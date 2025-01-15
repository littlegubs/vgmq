import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { UserStore } from '../../store/user.store'

@Component({
  selector: 'app-home-theme',
  templateUrl: './home-theme.component.html',
})
export class HomeThemeComponent implements OnInit {
  loggedIn = false

  constructor(private userStore: UserStore, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userStore.userLoggedIn.subscribe((res) => {
      this.loggedIn = res
      this.cdr.detectChanges()
    })
  }
}
