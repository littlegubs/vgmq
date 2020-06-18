import { Component, OnInit } from '@angular/core'
import { AdminGameHttpService } from '../../../../../../core/http/admin-game.http.service'
import { ActivatedRoute } from '@angular/router'
import { Game, GameMusicUploadErrorResponse } from '../../../../../../shared/models/game'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { GameMusic } from '../../../../../../shared/models/game-music'

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
})
export class GameShowComponent implements OnInit {
  slug: string
  game: Game
  loading = false
  uploadLoading = false
  musicUploadForm: FormGroup
  musicFiles: File[] = []
  musicFormGroups: FormGroup[]

  get musics(): AbstractControl {
    return this.musicUploadForm.get('musics')
  }

  constructor(
    private adminGameHttpService: AdminGameHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.adminGameHttpService.get(this.route.snapshot.paramMap.get('slug')).subscribe((res) => {
      this.game = new Game(res)
      this.loading = false
    })
    this.musicUploadForm = this.formBuilder.group({
      musics: [null, [Validators.required.bind(this)]],
    })
  }

  uploadMusic(): void {
    this.uploadLoading = true
    this.adminGameHttpService
      .uploadMusics(this.route.snapshot.paramMap.get('slug'), this.musicFiles)
      .pipe(finalize(() => (this.uploadLoading = false)))
      .subscribe(
        (res) => {
          this.game = new Game(res)
        },
        (err: GameMusicUploadErrorResponse) => {
          err.errors.forEach((error) => {
            this.musics.setErrors({ apiErrors: error })
          })
        }
      )
  }

  fileUpload(event): void {
    if (event.target.files && event.target.files.length) {
      this.musicFiles = event.target.files
    } else {
      this.musicFiles = []
    }
  }

  handleGameMusicDeleted(gameMusicDeleted: GameMusic): void {
    this.game.gameMusics.splice(
      this.game.gameMusics.indexOf(this.game.gameMusics.find((gameMusic) => gameMusic.id === gameMusicDeleted.id)),
      1
    )
  }
}
