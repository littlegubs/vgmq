import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Game } from '../../../../../../shared/models/game'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { ApiErrorInterface } from '../../../../../../shared/models/api-error.interface'
import { HttpErrorResponse, HttpEventType } from '@angular/common/http'
import { AdminGameHttpService } from '../../../../../../core/http/admin-game-http.service'

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
  toggleLoading = false
  toggleErrorMessage: string
  fileUploadProgress = 0
  free = 0
  size = 0

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
      console.log(res.game)
      this.game = res.game
      this.free = res.free
      this.size = res.size
      this.loading = false
    })
    this.musicUploadForm = this.formBuilder.group({
      musics: [null, [Validators.required.bind(this)]],
    })
  }

  uploadMusic(): void {
    this.uploadLoading = true
    this.fileUploadProgress = 0
    this.adminGameHttpService
      .uploadMusics(this.route.snapshot.paramMap.get('slug'), this.musicFiles)
      .pipe(finalize(() => (this.uploadLoading = false)))
      .subscribe({
        next: (res) => {
          if (res.type === HttpEventType.Response) {
            this.game = res.body
          }
          if (res.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = (res.loaded / res.total) * 100
          }
        },
        error: (err: HttpErrorResponse) => {
          this.musics.setErrors({ apiError: (<ApiErrorInterface>err.error).message })
        },
      })
  }

  fileUpload(event: any): void {
    this.musicFiles = event?.target?.files ? event.target.files : undefined
  }

  handleGameMusicDeleted(index: number): void {
    this.game = {
      ...this.game,
      musics: this.game.musics.filter((_, i) => {
        return i !== index
      }),
    }
  }

  toggle(): void {
    this.toggleErrorMessage = undefined
    this.toggleLoading = true
    this.adminGameHttpService
      .toggleGame(this.game)
      .pipe(finalize(() => (this.toggleLoading = false)))
      .subscribe({
        next: (game) => {
          this.game = game
        },
        error: (error) => {
          this.toggleErrorMessage = error
        },
      })
  }
}
