import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { GameToMusic, GameToMusicType } from '../../../../../../../../shared/models/game-to-music'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { DateTime } from 'luxon'
import { ApiErrorInterface } from '../../../../../../../../shared/models/api-error.interface'
import { AdminGameHttpService } from '../../../../../../../../core/http/admin-game-http.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ConfirmMusicDeleteDialogComponent } from '../confirm-music-delete-dialog/confirm-music-delete-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { DerivedMusicDialogComponent } from '../derived-music-dialog/derived-music-dialog.component'
import { DerivedMusicComponent } from './derived-music/derived-music.component'
import { DatePipe, DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatIconButton } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { LinkDialogComponent } from '../link-dialog/link-dialog.component'

@Component({
  selector: 'app-music-row',
  templateUrl: './music-row.component.html',
  standalone: true,
  imports: [
    DerivedMusicComponent,
    NgForOf,
    MatIcon,
    MatMenu,
    MatIconButton,
    MatMenuItem,
    MatMenuTrigger,
    NgIf,
    DatePipe,
    DecimalPipe,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
  ],
})
export class MusicRowComponent implements OnInit {
  @Input() gameMusic: GameToMusic
  @Output() remove: EventEmitter<undefined> = new EventEmitter<undefined>()
  edit = false
  formGroup: FormGroup
  loading = false
  duration?: Date
  formErrorMessage?: string
  src?: SafeUrl
  listenLoading = false
  gameToMusicType = GameToMusicType

  constructor(private gameHttpService: AdminGameHttpService, private dom: DomSanitizer, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.duration = DateTime.fromSeconds(this.gameMusic.music.duration).toJSDate()
    this.formGroup = new FormGroup({
      title: new FormControl(this.gameMusic.title ?? this.gameMusic.music.title, Validators.required.bind(this)),
      artist: new FormControl(this.gameMusic.artist ?? this.gameMusic.music.artist),
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
      .saveMusic(this.gameMusic.id, this.formGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.gameMusic.title = res.title
          this.gameMusic.artist = res.artist
          this.edit = false
        },
        error: (error: ApiErrorInterface) => {
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
        },
      })
  }

  delete(): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmMusicDeleteDialogComponent, {
      data: this.gameMusic,
    })
    confirmDeleteDialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.loading = true
        this.gameHttpService
          .deleteGameMusic(this.gameMusic)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(() => {
            this.remove.emit()
          })
      }
    })
  }

  listen(): void {
    this.listenLoading = true
    this.gameHttpService.listen(this.gameMusic.id).subscribe((res) => {
      const reader = new FileReader()
      reader.onload = (e): void => {
        this.listenLoading = false
        const srcUrl = e.target.result
        if (typeof srcUrl === 'string') {
          this.src = this.dom.bypassSecurityTrustUrl(srcUrl)
        }
      }
      reader.readAsDataURL(res)
    })
  }

  addDerivedGame(): void {
    const derivedMusicDialog = this.dialog.open(DerivedMusicDialogComponent, { data: this.gameMusic })
    derivedMusicDialog.afterClosed().subscribe((gameToMusic: GameToMusic | undefined) => {
      if (gameToMusic) {
        this.gameMusic = gameToMusic
      }
    })
  }

  handleGameMusicDeleted(index: number): void {
    this.gameMusic = {
      ...this.gameMusic,
      derivedGameToMusics: this.gameMusic.derivedGameToMusics.filter((_, i) => {
        return i !== index
      }),
    }
  }

  link(): void {
    const linkDialog = this.dialog.open(LinkDialogComponent, { data: this.gameMusic })
    linkDialog.afterClosed().subscribe((gameToMusic: GameToMusic | undefined) => {
      if (gameToMusic) {
        this.gameMusic = gameToMusic
      }
    })
  }

  copyId(): void {
    void navigator.clipboard.writeText(String(this.gameMusic.id))
  }
}
