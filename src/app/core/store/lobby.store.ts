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

  public readonly lobby: Observable<Lobby | null> = this.lobbyBehaviorSubject.asObservable()
  public readonly users: Observable<LobbyUser[] | null> = this.usersBehaviorSubject.asObservable()
  public readonly me: Observable<LobbyUser | null> = this.meBehaviorSubject.asObservable()

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
    console.log(users)
    console.log( this.authService.decodeJwt().username)
    const me = users.find((user) => user.user.username === this.authService.decodeJwt().username)
    console.log( me)
    this.usersBehaviorSubject.next(users)
    this.meBehaviorSubject.next(me)
  }
}
