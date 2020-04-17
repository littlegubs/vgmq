import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { User } from 'src/classes/user'
import { Lobby } from 'src/classes/lobby'

@Component({
  selector: 'app-HomePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css'],
})
export class HomePageComponent implements OnInit {
  public lobby: Lobby
  showFilter = false
  isPrivate = false
  isPlaying = false
  isFull = false
  lobbies: Array<Lobby>
  user: User
  FakeArray: Array<any>

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {}

  showFilters(): void {
    this.showFilter = !this.showFilter
  }

  ngOnInit(): void {
    this.FakeArray = ['aze', 'aze', 'aze', 'aze']
  }
}
