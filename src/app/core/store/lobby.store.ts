import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Lobby, Message } from '../../shared/models/lobby'
import { LobbyUser } from '../../shared/models/lobby-user'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { LobbyMusic } from '../../shared/models/lobby-music'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class LobbyStore {
  private usersBehaviorSubject = new BehaviorSubject<LobbyUser[]>([])
  private meBehaviorSubject = new BehaviorSubject<LobbyUser>(null)
  private lobbyBehaviorSubject = new BehaviorSubject<Lobby | null>(null)
  private currentLobbyAudioBufferBehaviorSubject = new BehaviorSubject<ArrayBuffer | null>(null)
  private currentLobbyMusicAnswerBehaviorSubject = new BehaviorSubject<LobbyMusic | null>(null)
  private currentLobbyMusicBehaviorSubject = new BehaviorSubject<LobbyMusic | null>(null)
  private canPlayMusicBehaviorSubject = new BehaviorSubject<boolean>(false)
  private resumeMusicBehaviorSubject = new BehaviorSubject<void>(undefined)
  private messagesBehaviorSubject = new BehaviorSubject<Message[]>([])
  private hintModeGamesBehaviorSubject = new BehaviorSubject<string[]>([])
  private lobbyLoadProgressBehaviorSubject = new BehaviorSubject<number>(0)
  private lobbyErrorBehaviorSubject = new BehaviorSubject<string>(undefined)
  private lobbyServerBufferBehaviorSubject = new BehaviorSubject<boolean>(false)

  public readonly lobby: Observable<Lobby | null> = this.lobbyBehaviorSubject.asObservable()
  public readonly users: Observable<LobbyUser[] | null> = this.usersBehaviorSubject.asObservable()
  public readonly me: Observable<LobbyUser | null> = this.meBehaviorSubject.asObservable()
  public readonly currentLobbyAudioBuffer: Observable<ArrayBuffer | null> =
    this.currentLobbyAudioBufferBehaviorSubject.asObservable()
  public readonly currentLobbyMusicAnswer: Observable<LobbyMusic | null> =
    this.currentLobbyMusicAnswerBehaviorSubject.asObservable()
  public readonly currentLobbyMusic: Observable<LobbyMusic | null> =
    this.currentLobbyMusicBehaviorSubject.asObservable()
  public readonly canPlayMusic: Observable<boolean> = this.canPlayMusicBehaviorSubject.asObservable()
  public readonly resumeMusic: Observable<void> = this.resumeMusicBehaviorSubject.asObservable()
  public readonly messages: Observable<Message[]> = this.messagesBehaviorSubject.asObservable()
  public readonly hintModeGames: Observable<string[]> = this.hintModeGamesBehaviorSubject.asObservable()
  public readonly lobbyLoadProgress: Observable<number> = this.lobbyLoadProgressBehaviorSubject.asObservable()
  public readonly error: Observable<string> = this.lobbyErrorBehaviorSubject.asObservable()
  public readonly lobbyServerBuffer: Observable<boolean> = this.lobbyServerBufferBehaviorSubject.asObservable()

  constructor(private authService: AuthService, private router: Router, private snack: MatSnackBar) {}

  disconnect(): void {
    this.lobbyBehaviorSubject.next(null)
    this.usersBehaviorSubject.next(null)
    this.meBehaviorSubject.next(null)
    this.currentLobbyAudioBufferBehaviorSubject.next(null)
    this.currentLobbyMusicAnswerBehaviorSubject.next(null)
  }

  getLobby(): Lobby | null {
    return this.lobbyBehaviorSubject.getValue()
  }

  setLobby(lobby: Lobby | null): void {
    this.lobbyBehaviorSubject.next(lobby)
  }

  getUsers(): LobbyUser[] {
    return this.usersBehaviorSubject.getValue()
  }

  getMe(): LobbyUser | null {
    return this.meBehaviorSubject.getValue()
  }

  setUsers(users: LobbyUser[]): void {
    const me = users.find((user) => user.user.username === this.authService.decodeJwt().username)
    if (me === undefined) {
      this.snack.open('You have been kicked out from the lobby', undefined, {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: 'danger',
        duration: 5000,
      })
      void this.router.navigate(['/'])
    } else {
      me.me = true
      this.usersBehaviorSubject.next(users)
      this.meBehaviorSubject.next(me)
    }
  }

  getCurrentLobbyAudioBuffer(): ArrayBuffer | null {
    return this.currentLobbyAudioBufferBehaviorSubject.getValue()
  }

  setCurrentLobbyAudioBuffer(arrayBuffer: ArrayBuffer | null): void {
    this.currentLobbyAudioBufferBehaviorSubject.next(arrayBuffer)
  }

  getCurrentLobbyMusicAnswer(): LobbyMusic | null {
    return this.currentLobbyMusicAnswerBehaviorSubject.getValue()
  }

  setCurrentLobbyMusicAnswer(lobbyMusicAnswer: LobbyMusic | null): void {
    this.currentLobbyMusicAnswerBehaviorSubject.next(lobbyMusicAnswer)
  }

  getCurrentLobbyMusic(): LobbyMusic | null {
    return this.currentLobbyMusicBehaviorSubject.getValue()
  }

  setCurrentLobbyMusic(lobbyMusic: LobbyMusic | null): void {
    this.currentLobbyMusicBehaviorSubject.next(lobbyMusic)
    this.currentLobbyMusicAnswerBehaviorSubject.next(null)
  }

  updateLobbyUser(lobbyUser: LobbyUser): void {
    let users = this.getUsers()
    const index = users.findIndex((user) => user.user.username === lobbyUser.user.username)
    if (index !== -1) {
      users[index] = lobbyUser
    } else {
      users = [...users, lobbyUser]
    }
    this.setUsers(users)
  }

  getCanPlayMusic(): boolean {
    return this.canPlayMusicBehaviorSubject.getValue()
  }

  setCanPlayMusic(canPlayMusic: boolean): void {
    this.canPlayMusicBehaviorSubject.next(canPlayMusic)
  }

  setResumeMusic(): void {
    this.resumeMusicBehaviorSubject.next()
  }

  getMessages(): Message[] {
    return this.messagesBehaviorSubject.getValue()
  }

  addMessage(message: Message): void {
    this.messagesBehaviorSubject.next([...this.getMessages(), message])
  }

  setMessages(messages: Message[]): void {
    this.messagesBehaviorSubject.next(messages)
  }

  setHintModeGames(games: string[]): void {
    this.hintModeGamesBehaviorSubject.next(games)
    const me = this.getMe()
    if (me) {
      me.hintMode = true
    }
  }
  setLobbyLoadProgress(progress: number): void {
    this.lobbyLoadProgressBehaviorSubject.next(progress)
  }
  setLobbyError(error: string): void {
    this.lobbyErrorBehaviorSubject.next(error)
  }
  resetLobbyError(): void {
    this.lobbyErrorBehaviorSubject.next(undefined)
  }
  setLobbyServerBuffer(buffer: boolean): void {
    this.lobbyServerBufferBehaviorSubject.next(buffer)
  }
}
