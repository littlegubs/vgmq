import { Component, Inject, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { map, Observable, of } from 'rxjs'
import { Game } from '../../../../../../../../shared/models/game'
import { distinctUntilChanged, switchMap } from 'rxjs/operators'
import { AdminGameHttpService } from '../../../../../../../../core/http/admin-game-http.service'
import { GameToMusic } from '../../../../../../../../shared/models/game-to-music'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { GameHttpService } from '../../../../../../../../core/http/game-http.service'

@Component({
  selector: 'app-derived-music-dialog-dialog',
  templateUrl: './derived-music-dialog.component.html',
  standalone: false,
})
export class DerivedMusicDialogComponent implements OnInit {
  myControl = new FormControl()
  games: Observable<Game[]>
  gameMusic: GameToMusic

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameToMusic,
    private gameHttpService: GameHttpService,
    private adminGameHttpService: AdminGameHttpService,
    private dialogRef: MatDialogRef<DerivedMusicDialogComponent>
  ) {}

  ngOnInit(): void {
    this.gameMusic = this.data
    this.games = this.myControl.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((name) =>
        !name ? of(null) : this.gameHttpService.search({ query: name, nsfw: true }).pipe(map((res) => res.data))
      )
    )
  }

  submit(): void {
    this.adminGameHttpService.addDerivedGameToMusic(this.gameMusic.id, this.myControl.value).subscribe((res) => {
      this.dialogRef.close(res)
    })
  }

  displayGame(game: Game): string {
    return game ? game.name : ''
  }
}
