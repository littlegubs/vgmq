import { Component, OnInit } from '@angular/core'
import { UserStore } from '../../store/user.store'

@Component({
  selector: 'app-home-theme',
  templateUrl: './home-theme.component.html',
})
export class HomeThemeComponent implements OnInit {
  loggedIn = false

  constructor(private userStore: UserStore) {}

  ngOnInit() {
    this.userStore.userLoggedIn.subscribe((res) => {
      this.loggedIn = res
    })
  }
}
