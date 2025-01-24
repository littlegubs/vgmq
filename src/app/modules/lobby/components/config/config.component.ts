import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import {
  Lobby,
  LobbyCollectionFilter,
  LobbyConfig,
  LobbyDifficulties,
  LobbyGameModes,
  LobbyHintMode,
  LobbyInfo,
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
    allowCollection: FormControl<boolean>
    gameMode: FormControl<LobbyGameModes>
    playMusicOnAnswerReveal: FormControl<boolean>
    showCorrectAnswersDuringGuessTime: FormControl<boolean>
    hintMode: FormControl<LobbyHintMode>
    filterByYear: FormControl<boolean>
    filterMinYear: FormControl<number>
    filterMaxYear: FormControl<number>
    collectionFilters: FormArray<
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
      guessTime: [this.lobby ? this.lobby.guessTime : 20, [Validators.max(60), Validators.min(5)]],
      allowDuplicates: [this.lobby ? this.lobby.allowDuplicates : false],
      easyDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Easy) : true],
      mediumDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Medium) : true],
      hardDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Hard) : true],
      allowContributeToMissingData: [this.lobby ? this.lobby.allowContributeToMissingData : true],
      allowCollection: [this.lobby ? this.lobby.allowCollection : false],
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
    })
    this.loading = false
    if (this.lobby) {
      this.subscriptions = [
        this.lobbyStore.lobby.subscribe((lobby) => {
          this.lobby = lobby
          this.collectionFilters = lobby.collectionFilters
          this.lobbyForm.patchValue({
            name: this.lobby.name,
            ...(this.lobby?.password && { password: this.lobby?.password }),
            musicNumber: this.lobby.musicNumber,
            guessTime: this.lobby.guessTime,
            allowDuplicates: this.lobby.allowDuplicates,
            easyDifficulty: this.lobby.difficulty.includes(LobbyDifficulties.Easy),
            mediumDifficulty: this.lobby.difficulty.includes(LobbyDifficulties.Medium),
            hardDifficulty: this.lobby.difficulty.includes(LobbyDifficulties.Hard),
            collectionFilters: this.lobby.collectionFilters.map((collectionFilter) => {
              return {
                id: collectionFilter.collection.id,
                type: collectionFilter.type,
                limitation: collectionFilter.limitation,
              }
            }),
          })
        }),
        this.lobbyStore.me.subscribe((me) => {
          if (me !== null) {
            this.userCanEdit = me.role === LobbyUserRoles.Host
            this.userCanEdit ? this.lobbyForm.enable() : this.lobbyForm.disable()
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
      switchMap((name: string) => this.gameHttpService.getCollections(name)),
      map((collections) => {
        return collections.filter(
          (collection) => !this.collectionFilters.map((c) => c.collection.id).includes(collection.id)
        )
      })
    )
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
      allowCollection: this.lobbyForm.get('allowCollection').value,
      collectionFilters: this.lobbyForm.controls.collectionFilters.getRawValue().map((formGroup) => {
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

  formatCollection = (value: Collection | null): string => {
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

  deleteCollection(index: number): void {
    this.collectionFilters.splice(index, 1)
    this.lobbyForm.controls.collectionFilters.removeAt(index)
    this.collectionFormControl.setValue('')
  }
}
