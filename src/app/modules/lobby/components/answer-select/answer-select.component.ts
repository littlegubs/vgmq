import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { FormControl } from '@angular/forms'
import { distinctUntilChanged, switchMap, filter } from 'rxjs/operators'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { CustomSocket } from '../../../../core/socket/custom.socket'

@Component({
  selector: 'app-lobby-answer',
  templateUrl: './answer-select.component.html',
})
export class AnswerSelectComponent implements OnInit {
  myControl = new FormControl()
  gameNames: Observable<string[]>
  lobby: Lobby
  lobbyStatuses = LobbyStatuses

  constructor(
    private lobbyHttpService: LobbyHttpService,
    private lobbyStore: LobbyStore,
    private gameHttpService: GameHttpService,
    private socket: CustomSocket
  ) {}

  ngOnInit(): void {
    this.lobbyStore.lobby.subscribe((lobby) => {
      if (this.lobby !== undefined) {
        if (this.lobby.status !== lobby.status) {
          if (lobby.status === LobbyStatuses.AnswerReveal) {
            this.myControl.disable()
          } else {
            this.myControl.enable()
            this.myControl.setValue('')
          }
        }
      }
      this.lobby = lobby
    })
    this.lobbyStore.me.subscribe((me) => {
      if (me !== null && me.correctAnswer !== null) {
        this.myControl.setValue(null)
        if (me.correctAnswer === true) {
          this.myControl.disable()
        }
      }
    })
    this.gameNames = this.myControl.valueChanges.pipe(
      distinctUntilChanged(),
      filter((name) => !!name),
      switchMap((name) => this.gameHttpService.getNames(name))
    )
  }

  submit(): void {
    console.log('???')
    this.socket.emit('answer', this.myControl.value)
  }
}
