import { Socket } from 'ngx-socket-io'
import { AuthService } from '../services/auth.service'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable()
export class LobbyListSocket extends Socket {
  constructor(private authService: AuthService) {
    super({ url: `${environment.lobbySocketUrl}/list`, options: { transports: ['websocket'] } })
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }
  }
}
