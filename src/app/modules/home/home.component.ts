import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'
import { User } from 'src/app/shared/models/user'
import { Lobby } from 'src/app/shared/models/lobby'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public lobby: Lobby
  showFilter = false
  isPrivate = false
  isPlaying = false
  isFull = false
  lobbies: Array<Lobby>
  user: User
  FakeArray: Array<any>

  constructor(private router: Router) {}

  showFilters(): void {
    this.showFilter = !this.showFilter
  }

  ngOnInit(): void {
    this.FakeArray = ['aze', 'aze', 'aze', 'aze']
  }
}
