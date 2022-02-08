import { Socket } from 'ngx-socket-io'
import { AuthService } from '../services/auth.service'
import { Injectable } from '@angular/core'
@Injectable()
export class CustomSocket extends Socket {
  lastTriedOutputEventName?: string
  lastTriedOutputArgs?: any[]
  constructor(private authService: AuthService) {
    super({ url: 'http://localhost:3000', options: {} })
    this.ioSocket['auth'] = { token: this.authService.getAccessToken() }
  }

  emit(_eventName: string, ..._args: any[]): any {
    this.lastTriedOutputEventName = _eventName
    this.lastTriedOutputArgs = _args

    return super.emit(_eventName, ..._args)
  }
}
