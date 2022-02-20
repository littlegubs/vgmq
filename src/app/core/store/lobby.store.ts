import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Lobby } from '../../shared/models/lobby'
import { LobbyUser } from '../../shared/models/lobby-user'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class LobbyStore {
  private usersBehaviorSubject = new BehaviorSubject<LobbyUser[] | null>(null)
  private meBehaviorSubject = new BehaviorSubject<LobbyUser>(null)
  private lobbyBehaviorSubject = new BehaviorSubject<Lobby | null>(null)
  private currentLobbyMusicIdBehaviorSubject = new BehaviorSubject<string | null>(null)
  private currentLobbyMusicAnswerBehaviorSubject = new BehaviorSubject<string | null>(null)

  public readonly lobby: Observable<Lobby | null> = this.lobbyBehaviorSubject.asObservable()
  public readonly users: Observable<LobbyUser[] | null> = this.usersBehaviorSubject.asObservable()
  public readonly me: Observable<LobbyUser | null> = this.meBehaviorSubject.asObservable()
  public readonly currentLobbyMusicId: Observable<string | null> =
    this.currentLobbyMusicIdBehaviorSubject.asObservable()
  public readonly currentLobbyMusicAnswer: Observable<string | null> =
    this.currentLobbyMusicAnswerBehaviorSubject.asObservable()

  constructor(private authService: AuthService) {}

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
    this.usersBehaviorSubject.next(users)
    this.meBehaviorSubject.next(me)
  }

  getCurrentLobbyMusicId(): string | null {
    return this.currentLobbyMusicIdBehaviorSubject.getValue()
  }

  setCurrentLobbyMusicId(lobbyMusicId: string | null): void {
    this.currentLobbyMusicIdBehaviorSubject.next(lobbyMusicId)
  }

  getCurrentLobbyMusicAnswer(): string | null {
    return this.currentLobbyMusicAnswerBehaviorSubject.getValue()
  }

  setCurrentLobbyMusicAnswer(lobbyMusicAnswer: string | null): void {
    this.currentLobbyMusicAnswerBehaviorSubject.next(lobbyMusicAnswer)
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
