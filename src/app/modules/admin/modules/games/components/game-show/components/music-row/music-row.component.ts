import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { GameToMusic } from '../../../../../../../../shared/models/game-to-music'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { DateTime } from 'luxon'
import { ApiErrorInterface } from '../../../../../../../../shared/models/api-error.interface'
import { AdminGameHttpService } from '../../../../../../../../core/http/admin-game-http.service'

@Component({
  selector: '[musicRow]',
  templateUrl: './music-row.component.html',
})
export class MusicRowComponent implements OnInit {
  @Input() gameMusic: GameToMusic
  @Output() remove: EventEmitter<undefined> = new EventEmitter<undefined>()
  edit = false
  formGroup: FormGroup
  loading = false
  duration?: Date
  formErrorMessage?: string

  constructor(private gameHttpService: AdminGameHttpService) {}

  ngOnInit(): void {
    this.duration = DateTime.fromSeconds(this.gameMusic.music.duration).toJSDate()
  }

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
    this.gameHttpService
      .saveMusic(this.gameMusic.music, this.formGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (res) => {
          this.gameMusic.music = res
          this.edit = false
        },
        (error: ApiErrorInterface) => {
          if (Array.isArray(error.message)) {
            error.message.map((err) => {
              const formControl = this.formGroup.get(err.property)
              formControl?.markAsTouched()
              formControl?.setErrors({
                serverError: err.errors,
              })
            })
          } else {
            this.formErrorMessage = error.message
          }
        }
      )
  }

  delete(): void {
    this.loading = true
    this.gameHttpService
      .deleteGameMusic(this.gameMusic)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        this.remove.emit()
      })
  }
}
