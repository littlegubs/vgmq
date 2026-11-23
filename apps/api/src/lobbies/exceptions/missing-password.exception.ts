import { UnauthorizedException } from '@nestjs/common'

export class MissingPasswordException extends UnauthorizedException {}
