import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Game } from '../../../../../../shared/models/game'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { ApiErrorInterface } from '../../../../../../shared/models/api-error.interface'
import { HttpErrorResponse, HttpEventType } from '@angular/common/http'
import { AdminGameHttpService } from '../../../../../../core/http/admin-game-http.service'
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { GameToMusic } from '../../../../../../shared/models/game-to-music'
import { GameAlbum } from '../../../../../../shared/models/game-album'
import { AlbumsHttpService } from '../../../../../../core/http/admin/albums-http.service'
import { forkJoin } from 'rxjs'
import { environment } from '../../../../../../../environments/environment'

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
})
export class GameShowComponent implements OnInit {
  slug: string
  game: Game
  loading = false
  uploadLoading = false
  generateAlbumLoading = false
  reorderLoading = false
  musicUploadForm: FormGroup
  musicFiles: File[] = []
  toggleLoading = false
  toggleErrorMessage: string
  fileUploadProgress = 0
  free = 0
  size = 0
  cdnUrl = environment.cdnUrl

  @ViewChildren('gameAlbumDropList') gameAlbumsDropLists: QueryList<CdkDropList>

  get musics(): AbstractControl {
    return this.musicUploadForm.get('musics')
  }

  constructor(
    private adminGameHttpService: AdminGameHttpService,
    private adminAlbumHttpService: AlbumsHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.adminGameHttpService.get(this.route.snapshot.paramMap.get('slug')).subscribe((res) => {
      this.game = res.game
      this.free = res.free
      this.size = res.size
      this.loading = false
      this.initGameAlbums()
    })
    this.musicUploadForm = this.formBuilder.group({
      musics: [null, [Validators.required.bind(this)]],
    })
  }

  private initGameAlbums(): void {
    for (const gameAlbum of this.game.albums) {
      gameAlbum.disks = gameAlbum.musics.reduce((previousValue, currentValue) => {
        const disk = currentValue.disk ?? currentValue.music.disk
        if (disk !== null && !previousValue.some((pv) => pv.number === disk)) {
          previousValue.push({
            number: disk,
            data: gameAlbum.musics.filter((gtm) => gtm.disk === disk),
          })
        }

        return previousValue
      }, [])
      gameAlbum.musicsWithNoDisk = gameAlbum.musics.filter((gtm) => gtm.disk === null)
    }
    this.connectCdkDropLists()
  }

  private connectCdkDropLists(): void {
    this.changeDetectorRef.detectChanges()
    for (const gameAlbum of this.gameAlbumsDropLists) {
      const i = this.gameAlbumsDropLists.toArray().indexOf(gameAlbum)
      gameAlbum.connectedTo = this.gameAlbumsDropLists.toArray()
    }
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
            this.initGameAlbums()
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

  preUploadMusic(event: any): void {
    this.musicFiles = event?.target?.files ? event.target.files : undefined
  }

  preUploadImage(event: any, gameAlbum: GameAlbum): void {
    const target = event.target as HTMLInputElement
    const file = target.files[0]
    this.adminAlbumHttpService.editCover(gameAlbum.id, file).subscribe((cover) => {
      gameAlbum.cover = cover
    })
    // TODO: might be helpful for later
    // const reader = new FileReader()
    // reader.onload = (): void => {
    //   this.albumImageFiles[i] = { filePreview: reader.result }
    // }
    //
    // reader.readAsDataURL(file)
  }

  handleGameMusicDeleted(index: number, array: GameToMusic[]): void {
    array.splice(index, 1)
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

  drop(event: CdkDragDrop<GameToMusic[]>, album?: GameAlbum, disk?: number): void {
    this.reorderLoading = true
    const observables = []
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      for (const music of event.previousContainer.data) {
        music.track = event.previousContainer.data.indexOf(music) + 1
        observables.push(this.adminGameHttpService.saveMusic(music.id, music))
      }
    }
    for (const music of event.container.data) {
      music.album = album ? { id: album.id } : music.album
      music.disk = disk ?? null
      music.track = event.container.data.indexOf(music) + 1
      observables.push(this.adminGameHttpService.saveMusic(music.id, music))
    }
    forkJoin(observables)
      .pipe(finalize(() => (this.reorderLoading = false)))
      .subscribe({})
  }

  updateAlbumName(gameAlbum: GameAlbum): void {
    this.adminAlbumHttpService.edit(gameAlbum.id, gameAlbum).subscribe({})
  }

  createAlbum(): void {
    this.adminGameHttpService.createAlbum(this.game.slug).subscribe({
      next: (game) => {
        this.game = game
        this.initGameAlbums()
      },
    })
  }

  delete(gameAlbum: GameAlbum): void {
    this.adminAlbumHttpService.delete(gameAlbum.id).subscribe({
      next: (game) => {
        this.game = game
        this.initGameAlbums()
      },
    })
  }

  generateAlbums(): void {
    this.generateAlbumLoading = true
    this.adminGameHttpService
      .generateAlbums(this.game.slug)
      .pipe(finalize(() => (this.generateAlbumLoading = false)))
      .subscribe({
        next: (game) => {
          this.game = game
          this.initGameAlbums()
        },
      })
  }

  filterByDisk(album: GameAlbum, disk: number): GameToMusic[] {
    return album.disks.find((d) => d.number === disk).data
  }

  addDiskToAlbum(gameAlbum: GameAlbum): void {
    if (gameAlbum.disks.length === 0) {
      gameAlbum.disks = [{ number: 1, data: [] }]
    } else {
      gameAlbum.disks.push({ number: gameAlbum.disks[gameAlbum.disks.length - 1].number + 1, data: [] })
    }
    this.connectCdkDropLists()
  }
}
