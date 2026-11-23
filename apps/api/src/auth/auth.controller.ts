import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Request } from 'express'
import { MoreThan, Repository } from 'typeorm'

import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/auth-login.dto'
import { AuthRegisterDto } from './dto/auth-register.dto'
import { AuthRequestResetPasswordDto } from './dto/auth-request-reset-password.dto'
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtRefreshGuard } from './guards/jwt-refresh.guard'
import { RecaptchaGuard } from './guards/recaptcha.guard'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private authService: AuthService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    @Post('register')
    @UseGuards(RecaptchaGuard)
    async register(@Body() createUserDto: AuthRegisterDto): Promise<void> {
        return this.usersService.create(createUserDto)
    }

    @UseGuards(RecaptchaGuard)
    @Post('login')
    @HttpCode(200)
    async login(
        @Body() authLoginDto: AuthLoginDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        return this.authService.login(authLoginDto)
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    @HttpCode(200)
    refresh(@Req() request: Request): { accessToken: string } {
        return {
            accessToken: this.authService.getJwtAccessToken(<User>request.user),
        }
    }

    @Get('confirmation/:token')
    @HttpCode(200)
    async confirmation(
        @Param('token') token: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.usersService.findByConfirmationToken(token)
        if (user === null) {
            throw new NotFoundException()
        }
        await this.userRepository.save({ ...user, enabled: true, confirmationToken: null })
        return this.authService.getUserTokens(user)
    }

    @UseGuards(RecaptchaGuard)
    @Post('reset-password/request')
    @HttpCode(200)
    async requestResetPassword(
        @Body() authRequestResetPassword: AuthRequestResetPasswordDto,
    ): Promise<void> {
        const user = await this.usersService.findByEmail(authRequestResetPassword.email)
        if (user === null) {
            return
        }
        if (!user.enabled) {
            throw new UnauthorizedException("You've been banned")
        }
        if (
            user.resetPasswordTokenCreatedAt &&
            dayjs().diff(user.resetPasswordTokenCreatedAt, 'hour') < 24
        ) {
            throw new BadRequestException(
                'You already requested to change your password recently, please try again later',
            )
        }
        await this.authService.resetPassword(user)
    }

    @UseGuards(RecaptchaGuard)
    @Post('reset-password/:token')
    @HttpCode(200)
    async resetPassword(
        @Param('token') token: string,
        @Body() authResetPassword: AuthResetPasswordDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.userRepository.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenCreatedAt: MoreThan(dayjs().subtract(1, 'day').toDate()),
            },
        })
        if (user === null) {
            throw new NotFoundException('This link has expired')
        }
        await this.userRepository.save(
            this.userRepository.create({
                ...user,
                password: authResetPassword.password,
                resetPasswordToken: null,
                resetPasswordTokenCreatedAt: null,
            }),
        )
        return this.authService.getUserTokens(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() request: Request): Promise<void> {
        await this.authService.logout(request.user as User)
    }
}
