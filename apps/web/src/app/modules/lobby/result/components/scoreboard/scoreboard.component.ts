import { Component, Input, OnInit } from '@angular/core'
import { LobbyUser, LobbyUserRoles, LobbyUserStats } from '../../../../../shared/models/lobby-user'
import { DecimalPipe, NgClass, NgIf } from '@angular/common'
import { filter, firstValueFrom } from 'rxjs'
import { LobbyStore } from '../../../../../core/store/lobby.store'
import { LobbySocket } from '../../../../../core/socket/lobby.socket'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { Router } from '@angular/router'

@Component({
  selector: 'app-result-scoreboard',
  imports: [NgClass, DecimalPipe, NgIf],
  templateUrl: './scoreboard.component.html',
  animations: [
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-in',
          style({
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class ScoreboardComponent implements OnInit {
  @Input() users: LobbyUser[]
  me: LobbyUser
  databaseContributors: string[]
  patreons: string[]
  showFinalMessage = false
  lobbyUserRoles = LobbyUserRoles

  constructor(private lobbyStore: LobbyStore, private socket: LobbySocket, private router: Router) {}

  ngOnInit(): void {
    void firstValueFrom(this.lobbyStore.lobbyResultData.pipe(filter((data) => data !== null))).then((data) => {
      this.patreons = data.patreons
      this.databaseContributors = data.databaseContributors
    })
    this.lobbyStore.me.pipe(filter((me) => me !== null)).subscribe((me) => {
      this.me = me
    })
    setTimeout(() => {
      this.showFinalMessage = true
    }, 55000)
  }

  getTextColor(user: LobbyUser, property: keyof LobbyUserStats): { 'text-danger': boolean; 'text-primary': boolean } {
    return {
      'text-danger': user.stats[property].color === 'worst',
      'text-primary': user.stats[property].color === 'best',
    }
  }

  highlightUsername(...usernames: string[]): { 'text-primary': boolean } {
    return { 'text-primary': this.users.some((lobbyUser) => usernames.includes(lobbyUser.user.username)) }
  }

  restart(): void {
    this.socket.emit('restart')
  }

  leave(): void {
    this.socket.emit('leave')
    void this.router.navigate(['/'])
  }
}
