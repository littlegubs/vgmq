import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common'
import { BaseWsExceptionFilter } from '@nestjs/websockets'

import { AuthenticatedSocket } from '../../lobbies/socket-middleware'

@Catch(NotFoundException)
export class WsNotFoundExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost): void {
        super.catch(exception, host)

        const [socket] = host.getArgs<[AuthenticatedSocket]>()

        socket.emit(exception.name, {
            status: 'error',
            message: exception.message,
        })
    }
}
