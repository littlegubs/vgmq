import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { FormControl } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { CustomSocket } from '../../../../core/socket/custom.socket'
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators'
import { LobbyUser, LobbyUserRoles } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-answer',
  templateUrl: './answer-select.component.html',
})
export class AnswerSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  myControl = new FormControl()
  gameNames: Observable<string[]>
  lobby: Lobby
  me: LobbyUser | null = null
  lobbyStatuses = LobbyStatuses
  subscriptions: Subscription[] = []
  @ViewChild('answerAutocomplete') answerAutocomplete: ElementRef

  constructor(
    private lobbyHttpService: LobbyHttpService,
    private lobbyStore: LobbyStore,
    private gameHttpService: GameHttpService,
    private socket: CustomSocket,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gameNames = this.myControl.valueChanges.pipe(
      distinctUntilChanged(),
      filter((name) => !!name),
      switchMap((name) => {
        console.log(name)

        return this.gameHttpService.getNames(name)
      })
    )
  }

  ngAfterViewInit(): void {
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        if (lobby !== null) {
          if (this.me?.role === LobbyUserRoles.Spectator) {
            this.myControl.disable()
          } else {
            if (lobby.status === LobbyStatuses.AnswerReveal) {
              this.myControl.disable()
              this.cdf.detectChanges()
            } else {
              this.myControl.enable()
              this.myControl.setValue('')
              this.answerAutocomplete.nativeElement.focus()
              this.cdf.detectChanges()
            }
          }
        }
        this.lobby = lobby
      }),
      this.lobbyStore.me.subscribe((me) => {
        if (me !== null) {
          this.me = me
          if (this.me.role == LobbyUserRoles.Spectator) {
            this.myControl.disable()
          } else {
            if (me.correctAnswer !== null) {
              this.myControl.setValue(null)
              if (me.correctAnswer === true) {
                this.myControl.disable()
              }
            }
          }
        }
      }),
    ]
  }

  submit(): void {
    this.socket.emit('answer', this.myControl.value)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}
