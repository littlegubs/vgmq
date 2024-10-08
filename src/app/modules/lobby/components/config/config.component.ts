import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby, LobbyDifficulties, LobbyGameModes, LobbyHintMode } from '../../../../shared/models/lobby'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyUserRoles } from '../../../../shared/models/lobby-user'
import { AuthService } from '../../../../core/services/auth.service'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-lobby-config',
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit, OnDestroy {
  lobbyForm?: FormGroup
  lobby?: Lobby
  loading = false
  userCanEdit = true
  subscriptions: Subscription[] = []
  musicAccuracyRatio: number
  lobbyGameModes = LobbyGameModes
  lobbyHintModes = LobbyHintMode
  songSelectionPercentage = 100

  @ViewChild('musicPlayedInput') musicPlayedInput: ElementRef

  constructor(
    private fb: FormBuilder,
    private lobbyHttpService: LobbyHttpService,
    private router: Router,
    private lobbyStore: LobbyStore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.lobby = this.lobbyStore.getLobby()
    this.songSelectionPercentage = this.lobby ? (this.lobby.playedMusics / this.lobby.musicNumber) * 100 : 100
    this.lobbyHttpService.info().subscribe((res) => {
      this.musicAccuracyRatio = res
    })
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
      customDifficulty: [this.lobby ? this.lobby.customDifficulty : false],
      easyDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Easy) : true],
      mediumDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Medium) : true],
      hardDifficulty: [this.lobby ? this.lobby.difficulty.includes(LobbyDifficulties.Hard) : true],
      allowContributeToMissingData: [this.lobby ? this.lobby.allowContributeToMissingData : true],
      gameMode: [this.lobby ? this.lobby.gameMode : LobbyGameModes.Standard],
      playMusicOnAnswerReveal: [this.lobby ? this.lobby.playMusicOnAnswerReveal : true],
      showCorrectAnswersDuringGuessTime: [this.lobby ? this.lobby.showCorrectAnswersDuringGuessTime : false],
      hintMode: [this.lobby ? this.lobby.hintMode : LobbyHintMode.Allowed, [Validators.required.bind(this)]],
    })
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  submit(): void {
    this.loading = true
    let difficulty: LobbyDifficulties[] = []
    if (this.lobbyForm.get('easyDifficulty').value) difficulty = [...difficulty, LobbyDifficulties.Easy]
    if (this.lobbyForm.get('mediumDifficulty').value) difficulty = [...difficulty, LobbyDifficulties.Medium]
    if (this.lobbyForm.get('hardDifficulty').value) difficulty = [...difficulty, LobbyDifficulties.Hard]
    if (this.lobby === null) {
      this.lobbyHttpService
        .create({
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
        })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((res) => {
          void this.router.navigate([`/lobby/${res.code}`])
        })
    } else {
      this.lobbyHttpService
        .update(this.lobby.code, {
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
        })
        .pipe(finalize(() => (this.loading = false)))
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
      Math.round((this.musicAccuracyRatio + Number.EPSILON) * 10000) / 100
    }% chance</strong> to not reflect the difficulty chosen in order to improve our database.<br>The more you play, the lower the chance!`
  }
}
