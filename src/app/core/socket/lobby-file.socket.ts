import { Socket } from 'ngx-socket-io'
import { AuthService } from '../services/auth.service'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable()
export class LobbyFileSocket extends Socket {
  constructor(private authService: AuthService) {
    super({ url: `${environment.lobbyFileSocketUrl}/file`, options: { transports: ['websocket'] } })
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }
  }
}
