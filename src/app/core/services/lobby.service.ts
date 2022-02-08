import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Lobby, LobbyStatuses } from '../../shared/models/lobby'
import { CustomSocket } from '../socket/custom.socket'

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private http: HttpClient, private socket: CustomSocket) {}

  isPLaying(lobby: Lobby): boolean {
    return [
      LobbyStatuses.AnswerReveal.toString(),
      LobbyStatuses.Playing.toString(),
      LobbyStatuses.PlayingMusic.toString(),
    ].includes(lobby.status)
  }

  isFinalStanding(lobby: Lobby): boolean {
    return lobby.status === LobbyStatuses.FinalStanding
  }

  join(lobbyCode: string) {
    this.socket.emit('join', lobbyCode)
  }
}
