import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { map, Observable, of } from 'rxjs'
import { Game } from '../../../../../../../../shared/models/game'
import { distinctUntilChanged, switchMap } from 'rxjs/operators'
import { AdminGameHttpService } from '../../../../../../../../core/http/admin-game-http.service'
import { GameToMusic } from '../../../../../../../../shared/models/game-to-music'

@Component({
  selector: 'app-derived-music-dialog-dialog',
  templateUrl: './derived-music-dialog.component.html',
})
export class DerivedMusicDialogComponent implements OnInit {
  myControl = new FormControl()
  games: Observable<Game[]>
  gameMusic: GameToMusic

  constructor(private adminGameHttpService: AdminGameHttpService) {}

  ngOnInit(): void {
    this.games = this.myControl.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((name) =>
        !name
          ? of(null)
          : this.adminGameHttpService
              .search({ query: name, showDisabled: false, onlyShowWithoutMusics: false })
              .pipe(map((res) => res.data))
      )
    )
  }

  submit(): void {
    this.adminGameHttpService.addDerivedGameToMusic(this.gameMusic.id, this.myControl.value)
    this.myControl.setValue(null)
  }
}
