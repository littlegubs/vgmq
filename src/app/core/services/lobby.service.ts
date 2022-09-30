import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Lobby, LobbyStatuses } from '../../shared/models/lobby'
import { LobbySocket } from '../socket/lobby.socket'

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private http: HttpClient, private socket: LobbySocket) {}

  isPLaying(lobby: Lobby): boolean {
    return [
      LobbyStatuses.AnswerReveal,
      LobbyStatuses.Playing,
      LobbyStatuses.PlayingMusic,
      LobbyStatuses.Buffering,
    ].includes(lobby.status)
  }

  join(code: string, password: string | null = null): void {
    this.socket.emit('join', { code, password })
  }
}
