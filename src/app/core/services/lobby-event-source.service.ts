import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Lobby } from '../../shared/models/lobby'
import { environment } from '../../../environments/environment'
import { Store } from '@ngrx/store'
import { LobbyState } from '../reducers/lobby.reducer'
import { updateConfig, updateLobbyUsers } from '../actions/lobby.actions'
import { LobbyUser } from '../../shared/models/lobby-user'

@Injectable({
  providedIn: 'root',
})
export class LobbyEventSourceService {
  eventSource?: EventSource
  private subject = new BehaviorSubject([])

  constructor(private store: Store<LobbyState>) {}

  on(): Observable<any[]> {
    return this.subject.asObservable()
  }

  joinLobby(lobby: Lobby): void {
    if (this.eventSource === undefined) {
      const url = new URL(environment.mercureEndpoint)
      url.searchParams.append('topic', `${environment.apiEndpoint}/lobbies/${lobby.code}`)
      url.searchParams.append(
        'topic',
        `/.well-known/mercure/subscriptions/${environment.apiEndpoint}/lobbies/${lobby.code}{/subscriber}`
      )
      this.eventSource = new EventSource(url.toString(), { withCredentials: true })

      this.eventSource.onopen = (ev): void => {
        console.log(ev)
      }

      this.eventSource.onmessage = (ev): void => {
        console.log(ev)
      }
      this.eventSource.addEventListener('configUpdated', (evt: MessageEvent) => {
        this.store.dispatch(updateConfig({ lobby: new Lobby(JSON.parse(evt.data)) }))
      })
      this.eventSource.addEventListener('updateLobbyUsers', (evt: MessageEvent) => {
        const lobbyUsersArray = JSON.parse(evt.data)
        if (Array.isArray(lobbyUsersArray)) {
          this.store.dispatch(
            updateLobbyUsers({ lobbyUsers: lobbyUsersArray.map((lobbyUser) => new LobbyUser(lobbyUser)) })
          )
        }
      })

      this.eventSource.onerror = (ev): void => {
        console.log(ev)
      }
    }
  }
}
