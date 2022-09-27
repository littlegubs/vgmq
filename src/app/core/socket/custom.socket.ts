import { Socket } from 'ngx-socket-io'
import { AuthService } from '../services/auth.service'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable()
export class CustomSocket extends Socket {
  lastTriedOutputEventName?: string
  lastTriedOutputArgs?: any[]

  constructor(private authService: AuthService) {
    super({ url: environment.websocketEndpoint, options: { transports: ['websocket'] } })
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }
  }

  emit(_eventName: string, ..._args: any[]): any {
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }
    this.lastTriedOutputEventName = _eventName
    this.lastTriedOutputArgs = _args

    return super.emit(_eventName, ..._args)
  }

  emitWithoutSaving(_eventName: string, ..._args: any[]): any {
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }

    return super.emit(_eventName, ..._args)
  }
}
