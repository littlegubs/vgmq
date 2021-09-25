import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GameMusic } from '../../../../../../../../shared/models/game-music'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { GameHttpService } from '../../../../../../../../core/http/game-http.service'
import { finalize } from 'rxjs/operators'
import { AdminMusicApiErrors } from '../../../../../../../../shared/models/music'

@Component({
  selector: '[musicRow]',
  templateUrl: './music-row.component.html',
})
export class MusicRowComponent {
  @Input() gameMusic: GameMusic
  @Output() onDelete: EventEmitter<GameMusic> = new EventEmitter<GameMusic>()
  edit = false
  formGroup: FormGroup
  loading = false

  constructor(private formBuilder: FormBuilder, private adminGameHttpService: GameHttpService) {}

  createFormGroup(): void {
    this.edit = true
    this.formGroup = new FormGroup({
      title: new FormControl(this.gameMusic.music.title, Validators.required.bind(this)),
      artist: new FormControl(this.gameMusic.music.artist),
    })
  }

  get title(): AbstractControl {
    return this.formGroup.get('title')
  }

  get artist(): AbstractControl {
    return this.formGroup.get('artist')
  }

  cancel(): void {
    this.edit = false
    this.formGroup.reset()
  }

  save(): void {
    this.loading = true
    this.adminGameHttpService
      .saveMusic(this.gameMusic.music, this.formGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (res) => {
          this.gameMusic.music = res
          this.edit = false
        },
        (err: AdminMusicApiErrors) => {
          if (err.title) {
            this.title.setErrors({ apiError: err.title })
          }
          if (err.artist) {
            this.artist.setErrors({ apiError: err.artist })
          }
        }
      )
  }

  delete(): void {
    this.loading = true
    this.adminGameHttpService
      .deleteGameMusic(this.gameMusic)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        this.onDelete.emit(this.gameMusic)
      })
  }
}
