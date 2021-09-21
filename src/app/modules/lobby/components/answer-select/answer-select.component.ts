import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { FormControl } from '@angular/forms'
import { map, startWith } from 'rxjs/operators'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby, LobbyStatuses } from '../../../../shared/models/lobby'

@Component({
  selector: 'app-lobby-answer',
  templateUrl: './answer-select.component.html',
})
export class AnswerSelectComponent implements OnInit {
  myControl = new FormControl()
  gameNames: string[] = []
  filteredOptions: Observable<string[]>
  lobby: Lobby
  lobbyStatuses = LobbyStatuses
  constructor(private lobbyHttpService: LobbyHttpService) {}

  ngOnInit(): void {
    // this.store.select(selectGameNames).subscribe((res) => {
    //   if (res) {
    //     this.gameNames = res
    //   }
    // })
    // this.store.select(selectLobby).subscribe((res) => {
    //   if (this.lobby !== undefined) {
    //     if (this.lobby.status !== res.status) {
    //       if (res.status === LobbyStatuses.AnswerReveal) {
    //         this.myControl.disable()
    //       } else {
    //         this.myControl.enable()
    //         this.myControl.setValue('')
    //       }
    //     }
    //   }
    //   this.lobby = res
    // })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value === null ? '' : value))
    )
  }

  submit(): void {
    this.lobbyHttpService.answer(this.lobby.code, this.myControl.value).subscribe(() => {})
  }

  private filter(value?: string): string[] {
    const filterValue = value.toLowerCase()

    return this.gameNames.filter((option) => option.toLowerCase().includes(filterValue))
  }
}
