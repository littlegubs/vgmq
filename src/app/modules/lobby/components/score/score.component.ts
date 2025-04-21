import { Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Subscription } from 'rxjs'
import { LobbyUser, LobbyUserRoles } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-score',
  templateUrl: './score.component.html',
  standalone: false,
})
export class ScoreComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  users: LobbyUser[]
  me: LobbyUser

  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.users.subscribe((users) => {
        if (!users) return

        this.users = users
          .filter((user) => [LobbyUserRoles.Host, LobbyUserRoles.Player].includes(user.role))
          .sort((a, b) => {
            return a.points > b.points ? -1 : 1
          })
          .reduce((previousValue: LobbyUser[], currentValue, currentIndex) => {
            let rank = currentIndex === 0 ? 1 : previousValue[currentIndex - 1].rank + 1

            if (currentIndex !== 0 && currentValue.points === previousValue[currentIndex - 1].points) {
              rank = previousValue[currentIndex - 1].rank
            }

            return [...previousValue, { ...currentValue, rank }]
          }, [])
      }),
      this.lobbyStore.me.subscribe((me) => {
        this.me = me
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  getMeIndex(): number {
    return this.users.findIndex((user) => user.me)
  }

  getMe(): LobbyUser {
    return this.users.find((user) => user.me)
  }

  scoreExplanation(): string {
    return (
      'Points distribution: <ul class="score-explanation">' +
      '<li><strong class="text-primary">10 points</strong> when using the autocomplete<ul>' +
      '<li><strong class="text-primary">+5 points</strong> on the first try</li>' +
      '<li><strong class="text-primary">+5 points</strong> if the game is not in your list</li>' +
      '</ul></li>' +
      '<li><strong class="text-primary">5 points</strong> when using hints</li>' +
      '</ul>'
    )
  }
}
