import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { LobbyUser } from '../../../../../shared/models/lobby-user'
import { LobbyStore } from '../../../../../core/store/lobby.store'
import { filter, firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-result-leaderboard',
  imports: [],
  templateUrl: './leaderboard.component.html',
  animations: [
    trigger('fadeOut', [
      state(
        'true',
        style({
          opacity: 0,
        })
      ),
      transition('* => true', [
        animate(
          '0.5s ease-out',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
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
export class LeaderboardComponent implements OnInit {
  @HostBinding('@fadeOut') fadeOut: boolean
  show3rd = false
  show2nd = false
  show1st = false

  users: LobbyUser[]
  @Output() hide = new EventEmitter()

  constructor(private lobbyStore: LobbyStore) {}

  async ngOnInit(): Promise<void> {
    const users = await firstValueFrom(
      this.lobbyStore.users.pipe(filter((users) => users !== null && users.length > 0))
    )
    this.users = this.lobbyStore.sortUsersByPoints(users)
    setTimeout(() => {
      this.showFirstPlayer()
    }, 500)
    setTimeout(() => {
      this.showSecondPlayer()
    }, 2500)
    setTimeout(() => {
      this.show1st = true
    }, 4500)
    setTimeout(() => {
      this.fadeOut = true
    }, this.getLeaveTiming())
    setTimeout(() => {
      this.hide.emit()
    }, this.getLeaveTiming() + 500)
  }
  showFirstPlayer(): void {
    if (this.users[2]) {
      this.show3rd = true
    } else if (this.users[1]) {
      this.show2nd = true
    } else {
      this.show1st = true
    }
  }

  showSecondPlayer(): void {
    if (this.users[1] && !this.show2nd) {
      this.show2nd = true
    } else {
      this.show1st = true
    }
  }
  getLeaveTiming(): number {
    if (this.users.length === 1) return 5500
    if (this.users.length === 2) return 7500

    return 9500
  }
}
