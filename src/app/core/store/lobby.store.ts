import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Lobby } from '../../shared/models/lobby'
import { LobbyUser } from '../../shared/models/lobby-user'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { LobbyMusic } from '../../shared/models/lobby-music'

@Injectable({
  providedIn: 'root',
})
export class LobbyStore {
  private usersBehaviorSubject = new BehaviorSubject<LobbyUser[] | null>(null)
  private meBehaviorSubject = new BehaviorSubject<LobbyUser>(null)
  private lobbyBehaviorSubject = new BehaviorSubject<Lobby | null>(null)
  private currentLobbyAudioBufferBehaviorSubject = new BehaviorSubject<ArrayBuffer | null>(null)
  private currentLobbyMusicAnswerBehaviorSubject = new BehaviorSubject<LobbyMusic | null>(null)
  private currentLobbyMusicBehaviorSubject = new BehaviorSubject<LobbyMusic | null>(null)

  public readonly lobby: Observable<Lobby | null> = this.lobbyBehaviorSubject.asObservable()
  public readonly users: Observable<LobbyUser[] | null> = this.usersBehaviorSubject.asObservable()
  public readonly me: Observable<LobbyUser | null> = this.meBehaviorSubject.asObservable()
  public readonly currentLobbyAudioBuffer: Observable<ArrayBuffer | null> =
    this.currentLobbyAudioBufferBehaviorSubject.asObservable()
  public readonly currentLobbyMusicAnswer: Observable<LobbyMusic | null> =
    this.currentLobbyMusicAnswerBehaviorSubject.asObservable()
  public readonly currentLobbyMusic: Observable<LobbyMusic | null> =
    this.currentLobbyMusicBehaviorSubject.asObservable()

  constructor(private authService: AuthService, private router: Router) {}

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

  getUsers(): LobbyUser[] | null {
    return this.usersBehaviorSubject.getValue()
  }

  setUsers(users: LobbyUser[] | null): void {
    const me = users.find((user) => user.user.username === this.authService.decodeJwt().username)
    // if me is undefined, this means the user disconnected
    if (me === undefined) {
      void this.router.navigate(['/'])
    } else {
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
  }

  handleLobbyUserAnswer(lobbyUser: LobbyUser): void {
    const users = this.getUsers()
    const index = users.findIndex((user) => user.user.username === lobbyUser.user.username)
    if (index !== -1) {
      users[index] = lobbyUser
    }
    this.setUsers(users)
  }
}
