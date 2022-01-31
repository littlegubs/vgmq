import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'
import { Game } from '../../../../shared/models/game'

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
})
export class GameShowComponent implements OnInit {
  slug: string
  game: Game
  loading = false

  constructor() {}

  ngOnInit(): void {}
}
