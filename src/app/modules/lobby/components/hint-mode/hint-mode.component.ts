import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core'
import { Subscription } from 'rxjs'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbySocket } from '../../../../core/socket/lobby.socket'
import { FormControl } from '@angular/forms'
import { LobbyUserRoles } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-hint-mode',
  templateUrl: './hint-mode.component.html',
})
export class HintModeComponent implements OnInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = []
  games: string[] = []

  formControl = new FormControl<string>('')
  @ViewChildren('xd') spans: QueryList<ElementRef>

  constructor(private lobbyStore: LobbyStore, private lobbySocket: LobbySocket) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.hintModeGames.subscribe((games) => {
        this.games = games
      }),
      this.formControl.valueChanges.subscribe((value) => {
        this.lobbySocket.emit('answer', value)
      }),
      this.lobbyStore.me.subscribe((me) => {
        if (me) {
          if (me.role === LobbyUserRoles.Spectator || me.correctAnswer) {
            this.formControl.disable()
          }
        }
      }),
    ]
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spans.forEach((item) => {
        const maxHeight = 55
        let baseVH = 2
        if (item.nativeElement.offsetHeight > maxHeight) {
          baseVH = (2 * maxHeight) / item.nativeElement.offsetHeight
        }
        item.nativeElement.style.fontSize = `${baseVH}vh`
      })
    }, 1) // why ? :(
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}
