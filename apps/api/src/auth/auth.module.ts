import { HttpModule } from '@nestjs/axios'
import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LobbyUser } from '../lobbies/entities/lobby-user.entity'
import { UserExistsRule } from '../users/unique.validator'
import { User } from '../users/user.entity'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { WsNotFoundExceptionFilter } from './exception-filter/ws-not-found.exception-filter'
import { WsUnauthorizedExceptionFilter } from './exception-filter/ws-unauthorized.exception-filter'
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { WsStrategy } from './strategies/ws.strategy'

@Module({
    controllers: [AuthController],
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: () => {
                return {
                    secret: process.env.JWT_SECRET,
                }
            },
        }),
        forwardRef(() => UsersModule),
        HttpModule,
        TypeOrmModule.forFeature([LobbyUser, User]),
    ],
    providers: [
        AuthService,
        ConfigService,
        JwtStrategy,
        JwtRefreshTokenStrategy,
        WsStrategy,
        UserExistsRule,
        WsUnauthorizedExceptionFilter,
        WsNotFoundExceptionFilter,
    ],
    exports: [AuthService],
})
export class AuthModule {}
