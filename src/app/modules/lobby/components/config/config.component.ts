import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import {
  Lobby,
  LobbyCollectionFilter,
  LobbyConfig,
  LobbyDifficulties,
  LobbyGameModes,
  LobbyGenreFilter,
  LobbyHintMode,
  LobbyInfo,
  LobbyThemeFilter,
} from '../../../../shared/models/lobby'
import { Router } from '@angular/router'
import { firstValueFrom, map, Observable, startWith, Subscription } from 'rxjs'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { AuthService } from '../../../../core/services/auth.service'
import { finalize, switchMap } from 'rxjs/operators'
import { GameHttpService } from '../../../../core/http/game-http.service'
import { Collection } from '../../../../shared/models/collection'
import { MatAutocompleteSelectedEvent, MatOption } from '@angular/material/autocomplete'
import { Genre } from '../../../../shared/models/genre'
import { Theme } from '../../../../shared/models/theme'

@Component({
  selector: 'app-lobby-config',
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit, OnDestroy {
  lobbyForm?: FormGroup<{
    name: FormControl<string>
    password: FormControl<string>
    musicNumber: FormControl<number>
    playedMusics: FormControl<number>
    guessTime: FormControl<number>
    allowDuplicates: FormControl<boolean>
    easyDifficulty: FormControl<boolean>
    mediumDifficulty: FormControl<boolean>
    hardDifficulty: FormControl<boolean>
    allowContributeToMissingData: FormControl<boolean>
    allowCollectionAnswer: FormControl<boolean>
    gameMode: FormControl<LobbyGameModes>
    playMusicOnAnswerReveal: FormControl<boolean>
    showCorrectAnswersDuringGuessTime: FormControl<boolean>
    hintMode: FormControl<LobbyHintMode>
    filterByYear: FormControl<boolean>
    filterMinYear: FormControl<number>
    filterMaxYear: FormControl<number>
    limitAllCollections: FormControl<boolean>
    limitAllCollectionsTo: FormControl<number>
    collectionFilters: FormArray<
      FormGroup<{
        id: FormControl<number>
        type: FormControl<'exclusion' | 'limitation'>
        limitation: FormControl<number>
      }>
    >
    genreFilters: FormArray<
      FormGroup<{
        id: FormControl<number>
        type: FormControl<'exclusion' | 'limitation'>
        limitation: FormControl<number>
      }>
    >
    themeFilters: FormArray<
      FormGroup<{
        id: FormControl<number>
        type: FormControl<'exclusion' | 'limitation'>
        limitation: FormControl<number>
      }>
    >
  }>
  lobby?: Lobby
  submitLoading = false
  loading = false
  userCanEdit = true
  subscriptions: Subscription[] = []
  lobbyInfo: LobbyInfo
  lobbyGameModes = LobbyGameModes
  lobbyHintModes = LobbyHintMode
  songSelectionPercentage = 100
  collections: Observable<Collection[]>
  collectionFormControl = new FormControl()
  collectionFilters: Partial<LobbyCollectionFilter>[] = []
  genres: Observable<Genre[]>
  genreFormControl = new FormControl()
  genreFilters: Partial<LobbyGenreFilter>[] = []
  themes: Observable<Theme[]>
  themeFormControl = new FormControl()
  themeFilters: Partial<LobbyThemeFilter>[] = []

  @ViewChild('musicPlayedInput') musicPlayedInput: ElementRef

  constructor(
    private fb: FormBuilder,
    private lobbyHttpService: LobbyHttpService,
    private gameHttpService: GameHttpService,
    private router: Router,
    private lobbyStore: LobbyStore,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.lobby = this.lobbyStore.getLobby()
    this.loading = true
    this.songSelectionPercentage = this.lobby ? (this.lobby.playedMusics / this.lobby.musicNumber) * 100 : 100
    this.lobbyInfo = await firstValueFrom(this.lobbyHttpService.info())
    this.lobbyForm = this.fb.group({
      name: [
        this.lobby ? this.lobby.name : `${this.authService.decodeJwt().username}'s lobby`,
        Validators.required.bind(this),
      ],
      password: [this.lobby?.password],
      musicNumber: [this.lobby ? this.lobby.musicNumber : 20, [Validators.max(100), Validators.min(5)]],
      playedMusics: [
        this.lobby ? this.lobby.playedMusics : 20,
        [Validators.max(this.lobby?.musicNumber ?? 20), Validators.min(0)],
      ],
      guessTime: [this.lobby ? this.lobby.guessTime : 20, [Validators.max(30), Validators.min(5)]],
      allowDuplicates: [this.lobby ? this.lobby.allowDuplicates : false],
      easyDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Easy) : true],
      mediumDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Medium) : true],
      hardDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Hard) : true],
      allowContributeToMissingData: [this.lobby ? this.lobby.allowContributeToMissingData : true],
      allowCollectionAnswer: [this.lobby ? this.lobby.allowCollectionAnswer : false],
      gameMode: [this.lobby ? this.lobby.gameMode : LobbyGameModes.Standard],
      playMusicOnAnswerReveal: [this.lobby ? this.lobby.playMusicOnAnswerReveal : true],
      showCorrectAnswersDuringGuessTime: [this.lobby ? this.lobby.showCorrectAnswersDuringGuessTime : false],
      hintMode: [this.lobby ? this.lobby.hintMode : LobbyHintMode.Allowed, [Validators.required.bind(this)]],
      filterByYear: [this.lobby ? this.lobby.filterByYear : false],
      filterMinYear: [
        this.lobby ? this.lobby.filterMinYear : this.lobbyInfo.filterMinYear,
        [Validators.max(this.lobbyInfo.filterMaxYear), Validators.min(this.lobbyInfo.filterMinYear)],
      ],
      filterMaxYear: [
        this.lobby ? this.lobby.filterMaxYear : this.lobbyInfo.filterMaxYear,
        [Validators.max(this.lobbyInfo.filterMaxYear), Validators.min(this.lobbyInfo.filterMinYear)],
      ],
      limitAllCollections: [this.lobby ? this.lobby.limitAllCollectionsTo > 0 : false],
      limitAllCollectionsTo: [this.lobby ? this.lobby.limitAllCollectionsTo || 1 : 1],
      collectionFilters: new FormArray(
        this.lobby?.collectionFilters
          ? this.lobby.collectionFilters.map(
              (collectionFilter) =>
                new FormGroup({
                  id: new FormControl(collectionFilter.id),
                  type: new FormControl(collectionFilter.type),
                  limitation: new FormControl(collectionFilter.limitation),
                })
            )
          : []
      ),
      genreFilters: new FormArray(
        this.lobby?.genreFilters
          ? this.lobby.genreFilters.map(
              (genreFilter) =>
                new FormGroup({
                  id: new FormControl(genreFilter.id),
                  type: new FormControl(genreFilter.type),
                  limitation: new FormControl(genreFilter.limitation),
                })
            )
          : []
      ),
      themeFilters: new FormArray(
        this.lobby?.themeFilters
          ? this.lobby.themeFilters.map(
              (themeFilter) =>
                new FormGroup({
                  id: new FormControl(themeFilter.id),
                  type: new FormControl(themeFilter.type),
                  limitation: new FormControl(themeFilter.limitation),
                })
            )
          : []
      ),
    })
    this.loading = false
    if (this.lobby) {
      this.subscriptions = [
        this.lobbyStore.lobby.subscribe((lobby) => {
          this.lobby = lobby
          this.lobbyForm.patchValue({
            name: this.lobby.name,
            ...(this.lobby?.password && { password: this.lobby?.password }),
            musicNumber: this.lobby.musicNumber,
            guessTime: this.lobby.guessTime,
            allowDuplicates: this.lobby.allowDuplicates,
            easyDifficulty: this.lobby.difficulty.includes(LobbyDifficulties.Easy),
            mediumDifficulty: this.lobby.difficulty.includes(LobbyDifficulties.Medium),
            hardDifficulty: this.lobby.difficulty.includes(LobbyDifficulties.Hard),
          })
          this.lobbyForm.controls.collectionFilters = new FormArray(
            lobby.collectionFilters.map((collectionFilter) => {
              return new FormGroup({
                id: new FormControl(collectionFilter.collection.id, [Validators.required.bind(this)]),
                type: new FormControl<'exclusion' | 'limitation'>(collectionFilter.type, [
                  Validators.required.bind(this),
                ]),
                limitation: new FormControl(collectionFilter.limitation),
              })
            })
          )
          this.lobbyForm.controls.genreFilters = new FormArray(
            lobby.genreFilters.map((collectionFilter) => {
              return new FormGroup({
                id: new FormControl(collectionFilter.genre.id, [Validators.required.bind(this)]),
                type: new FormControl<'exclusion' | 'limitation'>(collectionFilter.type, [
                  Validators.required.bind(this),
                ]),
                limitation: new FormControl(collectionFilter.limitation),
              })
            })
          )
          this.lobbyForm.controls.themeFilters = new FormArray(
            lobby.themeFilters.map((collectionFilter) => {
              return new FormGroup({
                id: new FormControl(collectionFilter.theme.id, [Validators.required.bind(this)]),
                type: new FormControl<'exclusion' | 'limitation'>(collectionFilter.type, [
                  Validators.required.bind(this),
                ]),
                limitation: new FormControl(collectionFilter.limitation),
              })
            })
          )
          this.collectionFilters = lobby.collectionFilters
          this.genreFilters = lobby.genreFilters
          this.themeFilters = lobby.themeFilters
          this.toggleForms()
        }),
        this.lobbyStore.me.subscribe((me) => {
          if (me !== null) {
            this.userCanEdit = me.role === LobbyUserRoles.Host
            this.toggleForms()
          }
        }),
      ]
    }
    this.lobbyForm.get('musicNumber').valueChanges.subscribe({
      next: (value) => {
        this.lobbyForm
          .get('musicNumber')
          .setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
        this.musicPlayedInput.nativeElement.max = value
        const playedMusicsControl = this.lobbyForm.get('playedMusics')
        playedMusicsControl.setValue(Math.round((value * this.songSelectionPercentage) / 100), {
          emitEvent: false,
        })
        playedMusicsControl.setValidators([Validators.max(this.lobby?.musicNumber || 20), Validators.min(0)])
      },
    })
    this.lobbyForm.get('guessTime').valueChanges.subscribe({
      next: (value) => {
        this.lobbyForm
          .get('guessTime')
          .setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
      },
    })
    this.lobbyForm.get('playedMusics').valueChanges.subscribe({
      next: (value) => {
        this.lobbyForm
          .get('playedMusics')
          .setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
        this.songSelectionPercentage = (value / this.lobbyForm.get('musicNumber').value) * 100
      },
    })
    this.collections = this.gameHttpService.getCollections('')
    this.collections = this.collectionFormControl.valueChanges.pipe(
      startWith(''),
      switchMap((name: string | null) =>
        name === null ? this.collections : this.gameHttpService.getCollections(name)
      ),
      map((collections) => {
        return collections.filter(
          (collection) => !this.collectionFilters.map((c) => c.collection.id).includes(collection.id)
        )
      })
    )
    this.genres = this.gameHttpService.getGenres('')
    this.genres = this.genreFormControl.valueChanges.pipe(
      startWith(''),
      switchMap((name: string | null) => (name === null ? this.genres : this.gameHttpService.getGenres(name))),
      map((genre) => {
        return genre.filter((genre) => !this.genreFilters.map((g) => g.genre.id).includes(genre.id))
      })
    )
    this.themes = this.gameHttpService.getThemes('')
    this.themes = this.themeFormControl.valueChanges.pipe(
      startWith(''),
      switchMap((name: string | null) => (name === null ? this.themes : this.gameHttpService.getThemes(name))),
      map((themes) => {
        return themes.filter((theme) => !this.themeFilters.map((t) => t.theme.id).includes(theme.id))
      })
    )
  }

  private toggleForms(): void {
    if (this.userCanEdit) {
      this.lobbyForm.enable()
      this.collectionFormControl.enable()
      this.genreFormControl.enable()
      this.themeFormControl.enable()
    } else {
      this.lobbyForm.disable()
      this.collectionFormControl.disable()
      this.genreFormControl.disable()
      this.themeFormControl.disable()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  submit(): void {
    this.submitLoading = true
    let difficulty: LobbyDifficulties[] = []
    if (this.lobbyForm.get('easyDifficulty').value) difficulty = [...difficulty, LobbyDifficulties.Easy]
    if (this.lobbyForm.get('mediumDifficulty').value) difficulty = [...difficulty, LobbyDifficulties.Medium]
    if (this.lobbyForm.get('hardDifficulty').value) difficulty = [...difficulty, LobbyDifficulties.Hard]
    const data: LobbyConfig = {
      name: this.lobbyForm.get('name').value,
      password: this.lobbyForm.get('password').value,
      musicNumber: this.lobbyForm.get('musicNumber').value,
      playedMusics: this.lobbyForm.get('playedMusics').value,
      guessTime: this.lobbyForm.get('guessTime').value,
      allowDuplicates: this.lobbyForm.get('allowDuplicates').value,
      difficulty: difficulty,
      allowContributeToMissingData: this.lobbyForm.get('allowContributeToMissingData').value,
      gameMode: this.lobbyForm.get('gameMode').value,
      playMusicOnAnswerReveal: this.lobbyForm.get('playMusicOnAnswerReveal').value,
      showCorrectAnswersDuringGuessTime: this.lobbyForm.get('showCorrectAnswersDuringGuessTime').value,
      hintMode: this.lobbyForm.get('hintMode').value,
      filterByYear: this.lobbyForm.get('filterByYear').value,
      filterMinYear: this.lobbyForm.get('filterMinYear').value,
      filterMaxYear: this.lobbyForm.get('filterMaxYear').value,
      allowCollectionAnswer: this.lobbyForm.get('allowCollectionAnswer').value,
      limitAllCollectionsTo: this.lobbyForm.controls.limitAllCollections.value
        ? this.lobbyForm.get('limitAllCollectionsTo').value
        : 0,
      collectionFilters: this.lobbyForm.controls.collectionFilters.getRawValue().map((formGroup) => {
        return { id: formGroup.id, type: formGroup.type, limitation: formGroup.limitation }
      }),
      genreFilters: this.lobbyForm.controls.genreFilters.getRawValue().map((formGroup) => {
        return { id: formGroup.id, type: formGroup.type, limitation: formGroup.limitation }
      }),
      themeFilters: this.lobbyForm.controls.themeFilters.getRawValue().map((formGroup) => {
        return { id: formGroup.id, type: formGroup.type, limitation: formGroup.limitation }
      }),
    }
    if (this.lobby === null) {
      this.lobbyHttpService
        .create(data)
        .pipe(finalize(() => (this.submitLoading = false)))
        .subscribe((res) => {
          void this.router.navigate([`/lobby/${res.code}`])
        })
    } else {
      this.lobbyHttpService
        .update(this.lobby.code, data)
        .pipe(finalize(() => (this.submitLoading = false)))
        .subscribe(() => {})
    }
  }

  hideContribution(): boolean {
    return (
      this.lobbyForm.get('easyDifficulty').value &&
      this.lobbyForm.get('mediumDifficulty').value &&
      this.lobbyForm.get('hardDifficulty').value
    )
  }

  accuracyText(): string {
    return `By checking this, each music has <strong class="text-primary">${
      Math.round((this.lobbyInfo.musicAccuracyRatio + Number.EPSILON) * 10000) / 100
    }% chance</strong> to not reflect the difficulty chosen in order to improve our database.<br>The more you play, the lower the chance!`
  }

  formatFilter = (value: Collection | Genre | Theme | null): string => {
    return value?.name
  }

  addCollectionFilter(value: MatAutocompleteSelectedEvent): void {
    const collection = (value.option as MatOption<Collection>).value
    this.collectionFilters.push({ type: 'exclusion', collection })
    this.lobbyForm.controls.collectionFilters.push(
      new FormGroup({
        id: new FormControl(collection.id, [Validators.required.bind(this)]),
        type: new FormControl<'exclusion' | 'limitation'>('exclusion', [Validators.required.bind(this)]),
        limitation: new FormControl(1),
      })
    )
    this.collectionFormControl.setValue('')
  }

  deleteCollectionFilter(index: number): void {
    this.collectionFilters.splice(index, 1)
    this.lobbyForm.controls.collectionFilters.removeAt(index)
    this.collectionFormControl.setValue('')
  }

  addGenreFilter(value: MatAutocompleteSelectedEvent): void {
    const genre = (value.option as MatOption<Genre>).value
    this.genreFilters.push({ type: 'exclusion', genre })
    this.lobbyForm.controls.genreFilters.push(
      new FormGroup({
        id: new FormControl(genre.id, [Validators.required.bind(this)]),
        type: new FormControl<'exclusion' | 'limitation'>('exclusion', [Validators.required.bind(this)]),
        limitation: new FormControl(1),
      })
    )
    this.genreFormControl.setValue('')
  }

  deleteGenreFilter(index: number): void {
    this.genreFilters.splice(index, 1)
    this.lobbyForm.controls.genreFilters.removeAt(index)
    this.genreFormControl.setValue('')
  }

  addThemeFilter(value: MatAutocompleteSelectedEvent): void {
    const theme = (value.option as MatOption<Theme>).value
    this.themeFilters.push({ type: 'exclusion', theme })
    this.lobbyForm.controls.themeFilters.push(
      new FormGroup({
        id: new FormControl(theme.id, [Validators.required.bind(this)]),
        type: new FormControl<'exclusion' | 'limitation'>('exclusion', [Validators.required.bind(this)]),
        limitation: new FormControl(1),
      })
    )
    this.themeFormControl.setValue('')
  }

  deleteThemeFilter(index: number): void {
    this.themeFilters.splice(index, 1)
    this.lobbyForm.controls.themeFilters.removeAt(index)
    this.themeFormControl.setValue('')
  }
}
