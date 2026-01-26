import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { Lobby, LobbyHintMode, LobbyStatuses } from '../../../../shared/models/lobby'
import { Subscription } from 'rxjs'
import { LobbyUser, LobbyUserRoles, LobbyUserStatus } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-center-container',
  templateUrl: './center-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CenterContainerComponent implements OnInit, OnDestroy {
  answer?: string | null
  subscriptions: Subscription[] = []
  lobby?: Lobby | null
  canPlayMusic = false
  lobbyStatuses = LobbyStatuses
  lobbyUserStatus = LobbyUserStatus
  lobbyHintModes = LobbyHintMode
  lobbyUserRoles = LobbyUserRoles
  me: LobbyUser
  loadProgress = 0
  error?: string
  serverBuffering = false
  constructor(
    private lobbyStore: LobbyStore,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.canPlayMusic.subscribe((canPlayMusic) => {
        this.canPlayMusic = canPlayMusic
        this.cdr.markForCheck()
      }),
      this.lobbyStore.lobby.subscribe((lobby) => {
        this.lobby = lobby
        this.cdr.markForCheck()
      }),
      this.lobbyStore.me.subscribe((me) => {
        this.me = me
        this.cdr.markForCheck()
      }),
      this.lobbyStore.lobbyLoadProgress.subscribe((progress) => {
        this.loadProgress = progress
        this.cdr.markForCheck()
      }),
      this.lobbyStore.error.subscribe((error) => {
        this.error = error
        this.cdr.markForCheck()
      }),
      this.lobbyStore.lobbyServerBuffer.subscribe((buffering) => {
        this.serverBuffering = buffering
        this.cdr.markForCheck()
      }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  play(): void {
    this.lobbyStore.setResumeMusic()
  }

  showAnswerComponent(): boolean {
    return (
      this.me?.role !== LobbyUserRoles.Spectator &&
      !this.me?.hintMode &&
      this.lobby?.status === LobbyStatuses.PlayingMusic
    )
  }

  showEmptyTopDiv(): boolean {
    return (
      this.lobby?.status === LobbyStatuses.Buffering ||
      this.lobby?.status === LobbyStatuses.Loading ||
      this.lobby?.hintMode !== LobbyHintMode.Allowed
    )
  }

  showEmptyBottomDiv(): boolean {
    return (
      this.lobby?.status === LobbyStatuses.Buffering ||
      this.lobby?.status === LobbyStatuses.Loading ||
      this.me?.role === LobbyUserRoles.Spectator
    )
  }
}
