import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    ForbiddenException,
    UseGuards,
    HttpCode,
    Delete,
    ConflictException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToInstance } from 'class-transformer'
import { Request } from 'express'
import { DateTime } from 'luxon'
import { Repository } from 'typeorm'

import { AuthService } from '../auth/auth.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { OauthPatreon } from '../oauth/entities/oauth-patreon.entity'
import { PatreonService } from '../oauth/services/patreon.service'
import { UsersUpdatePasswordDto } from './dto/users-update-password.dto'
import { UsersUpdateUsernameDto } from './dto/users-update-username.dto'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(OauthPatreon) private oauthPatreonRepository: Repository<OauthPatreon>,
        private patreonService: PatreonService,
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @Get('current')
    getCurrent(@Req() request: Request): {
        createdAt: Date
        email: string
        username: string
        patreonAccount: OauthPatreon | undefined
        entitledTiers: string[]
    } {
        const { createdAt, email, username, patreonAccount } = request.user as User

        const entitledTiers: string[] = []
        if (patreonAccount) {
            for (const tier of patreonAccount.currentlyEntitledTiers) {
                if (this.configService.get('PATREON_TIER_1_ID') === tier) {
                    entitledTiers.push('PATREON TIER 1')
                } else if (this.configService.get('PATREON_TIER_2_ID') === tier) {
                    entitledTiers.push('PATREON TIER 2')
                }
            }
        }

        return {
            createdAt,
            email,
            username,
            patreonAccount: instanceToInstance(patreonAccount, {
                groups: ['userProfile'],
                strategy: 'excludeAll',
            }),
            entitledTiers,
        }
    }

    @Post('password/update')
    @HttpCode(200)
    async updatePassword(
        @Body() usersUpdatePassword: UsersUpdatePasswordDto,
        @Req() request: Request,
    ): Promise<void> {
        const user = request.user as User

        if (!(await user.validatePassword(usersUpdatePassword.password))) {
            throw new ForbiddenException('Wrong password')
        }

        await this.userRepository.save(
            this.userRepository.create({
                ...user,
                password: usersUpdatePassword.newPassword,
            }),
        )
    }

    @Post('username/update')
    @HttpCode(200)
    async updateUsername(
        @Body() usersUpdateUsername: UsersUpdateUsernameDto,
        @Req() request: Request,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = request.user as User

        if (!(user.premium || (user.password === null && user.usernameUpdatedAt === null))) {
            throw new ForbiddenException('Updating your username is a premium feature!')
        }
        if (
            user.usernameUpdatedAt !== null &&
            DateTime.fromJSDate(user.usernameUpdatedAt).diffNow('months').negate().months === 0
        ) {
            throw new ForbiddenException(
                "You've already updated your username less than a month ago",
            )
        }
        if (await this.usersService.findByUsername(usersUpdateUsername.username)) {
            throw new ConflictException('username already used')
        }
        const userWithNewUsername = this.userRepository.create({
            ...user,
            username: usersUpdateUsername.username,
            usernameUpdatedAt: new Date(),
        })
        await this.userRepository.save(userWithNewUsername)
        const tokens = await this.authService.getUserTokens(userWithNewUsername)

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        }
    }

    @Get('username/keep')
    async keepUsername(@Req() request: Request): Promise<void> {
        const user = request.user as User

        await this.userRepository.save({ ...user, usernameUpdatedAt: new Date() })
    }

    @Delete('')
    async delete(@Req() request: Request): Promise<void> {
        const user = request.user as User
        user &&
            (await this.userRepository.save(
                this.userRepository.create({
                    ...user,
                    enabled: false,
                    username: `deletedAccount${user.id}`,
                    email: `deletedAccount${user.id}@videogamemusicquiz.com`,
                    password: null,
                    currentHashedRefreshToken: null,
                }),
            ))
    }

    @Get('should-change-username')
    shouldChangeUsername(@Req() request: Request): boolean {
        const user = request.user as User
        return user.password === null && user.usernameUpdatedAt === null
    }
}
