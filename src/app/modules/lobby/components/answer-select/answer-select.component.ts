import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { debounceTime, firstValueFrom, Observable, of, Subscription } from 'rxjs'
import { FormControl } from '@angular/forms'
import { Lobby } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { LobbySocket } from '../../../../core/socket/lobby.socket'
import { catchError, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { LobbyUser } from '../../../../shared/models/lobby-user'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { GameAutocompleteResponse } from '../../../../shared/models/game'

@Component({
  selector: 'app-lobby-answer',
  templateUrl: './answer-select.component.html',
  standalone: false,
})
export class AnswerSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  myControl = new FormControl()
  gameNames: Observable<GameAutocompleteResponse[]>
  lobby: Lobby
  me: LobbyUser | null = null
  subscriptions: Subscription[] = []
  @ViewChild('answerInput') answerInput: ElementRef
  @ViewChild('trigger') matAutocompleteTrigger: MatAutocompleteTrigger
  autocompleteFailed = false

  constructor(private lobbyStore: LobbyStore, private gameHttpService: GameHttpService, private socket: LobbySocket) {}

  ngOnInit(): void {
    this.gameNames = this.myControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(75),
      switchMap((name: string) => {
        if (!name) {
          return of(null)
        } else {
          this.autocompleteFailed = false

          return this.gameHttpService.getNames(name, this.lobby.allowCollectionAnswer)
        }
      }),
      catchError(() => {
        this.autocompleteFailed = true

        return of(null)
      })
    )
  }

  async ngAfterViewInit(): Promise<void> {
    this.lobby = await firstValueFrom(this.lobbyStore.lobby)
    this.answerInput.nativeElement.focus()
    this.subscriptions = [
      this.lobbyStore.lobby.subscribe((lobby) => {
        const lobbyIsPaused = lobby?.isPaused ?? false
        if (lobbyIsPaused) {
          this.myControl.disable()
        } else {
          this.myControl.enable()
        }
      }),

      this.lobbyStore.me.subscribe((me) => {
        if (me?.correctAnswer === true) {
          this.myControl.disable()
        }
      }),
    ]
  }

  submit(): void {
    this.socket.emit('answer', this.myControl.value)
    this.myControl.setValue(null)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }
}
