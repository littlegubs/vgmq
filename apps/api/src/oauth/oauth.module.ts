import { HttpModule } from '@nestjs/axios'
import { DynamicModule, Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { OauthPatreon } from './entities/oauth-patreon.entity'
import { OauthController } from './oauth.controller'
import { PatreonService } from './services/patreon.service'
import { GoogleStrategy } from './strategies/google.strategy'
import process from 'node:process'

@Module({})
export class OauthModule {
    static register(): DynamicModule {
        const strategies: Provider[] = []
        if (
            process.env.GOOGLE_CLIENT_ID &&
            process.env.GOOGLE_CLIENT_SECRET &&
            process.env.GOOGLE_CALLBACK_URL
        ) {
            strategies.push(GoogleStrategy)
        } else {
            console.warn(
                '⚠️ Google Strategy is not loaded. Missing Google credentials in .env.local file.',
            )
        }
        return {
            module: OauthModule,
            controllers: [OauthController],
            imports: [TypeOrmModule.forFeature([User, OauthPatreon]), HttpModule, AuthModule],
            providers: [PatreonService, ...strategies, UsersService],
            exports: [PatreonService],
        }
    }
}
