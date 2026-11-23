import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User } from '../../users/user.entity'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request): string => {
                    return request.body.refreshToken
                },
            ]),
            secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET!,
            passReqToCallback: true,
        })
    }

    async validate(request: Request, payload: { username: string }): Promise<User | undefined> {
        return this.authService.getUserIfRefreshTokenMatches(
            request.body.refreshToken,
            payload.username,
        )
    }
}
