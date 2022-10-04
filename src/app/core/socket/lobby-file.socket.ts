import { Socket } from 'ngx-socket-io'
import { AuthService } from '../services/auth.service'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable()
export class LobbyFileSocket extends Socket {
  constructor(private authService: AuthService) {
    // @ts-ignore
    super({ url: `${environment.lobbyFileSocketUrl}/file`, options: { transports: ['websocket'], forceNew: true } })
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }
  }
  emit(_eventName: string, ..._args: any[]): any {
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }

    return super.emit(_eventName, ..._args)
  }
}
