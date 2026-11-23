import { INestApplication, UnauthorizedException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { useContainer } from 'class-validator'
import * as cookieParser from 'cookie-parser'
import * as request from 'supertest'

import { AuthController } from '../src/auth/auth.controller'
import { AuthService } from '../src/auth/auth.service'
import { JwtRefreshTokenStrategy } from '../src/auth/strategies/jwt-refresh-token.strategy'
import { JwtStrategy } from '../src/auth/strategies/jwt.strategy'
import { exceptionPipe } from '../src/exception.pipe'
import { UserExistsRule } from '../src/users/unique.validator'
import { User } from '../src/users/user.entity'
import { UsersService } from '../src/users/users.service'

describe('AuthController (e2e)', () => {
    let app: INestApplication
    let userExistsRule: UserExistsRule
    let jwtRefreshTokenStrategy: JwtRefreshTokenStrategy
    let jwtStrategy: JwtStrategy
    let jwtService: JwtService
    let configService: ConfigService
    const authService = {
        getUserTokens: (): { accessToken: string; refreshToken: string } => ({
            accessToken: 'test',
            refreshToken: 'yoyo',
        }),
        login: (): { accessToken: string; refreshToken: string } => ({
            accessToken: 'test',
            refreshToken: 'yoyo',
        }),
        getJwtAccessToken: (): string => 'cool',
        logout: async (): Promise<void> => {
            await Promise.resolve()
        },
    }

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: ['.env.local', '.env'],
                }),
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: () => {
                        return {
                            secret: process.env.JWT_SECRET,
                        }
                    },
                }),
            ],
            controllers: [AuthController],
            providers: [
                UserExistsRule,
                { provide: getRepositoryToken(User), useValue: {} },
                {
                    provide: UsersService,
                    useValue: { create: (): { username: string } => ({ username: 'test' }) },
                },
                {
                    provide: AuthService,
                    useValue: authService,
                },
                JwtStrategy,
                JwtRefreshTokenStrategy,
                ConfigService,
            ],
        }).compile()

        app = moduleFixture.createNestApplication()
        useContainer(app, { fallbackOnErrors: true })
        app.use(cookieParser())
        app.useGlobalPipes(exceptionPipe)

        userExistsRule = moduleFixture.get(UserExistsRule)
        jwtRefreshTokenStrategy = moduleFixture.get(JwtRefreshTokenStrategy)
        jwtStrategy = moduleFixture.get(JwtStrategy)
        jwtService = moduleFixture.get(JwtService)
        configService = moduleFixture.get(ConfigService)
        await app.init()
    })

    describe('register', () => {
        it('should return 400 with missing field', () => {
            jest.spyOn(userExistsRule, 'validate').mockImplementation(() => Promise.resolve(true))
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    email: 'yoyo',
                })
                .set('Cookie', 'pote=pote')
                .expect(400, {
                    statusCode: 400,
                    message: [
                        { property: 'email', errors: ['email must be an email'] },
                        { property: 'username', errors: ['username should not be empty'] },
                        { property: 'password', errors: ['password should not be empty'] },
                    ],
                    error: 'Bad Request',
                })
        })
        it('should return 400 if user already exists', () => {
            jest.spyOn(userExistsRule, 'validate').mockImplementation(() => Promise.resolve(false))
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    email: 'email@exists.com',
                    username: 'alreadyExists',
                    password: 'password',
                })
                .set('Cookie', 'pote=pote')
                .expect(400, {
                    statusCode: 400,
                    message: [
                        { property: 'email', errors: ['email already exists'] },
                        { property: 'username', errors: ['username already exists'] },
                    ],
                    error: 'Bad Request',
                })
        })
        it('should return 401 if limited access cookie missing', () => {
            jest.spyOn(userExistsRule, 'validate').mockImplementation(() => Promise.resolve(true))
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    email: 'email@exists.com',
                    username: 'alreadyExists',
                    password: 'password',
                })
                .expect(401, {
                    statusCode: 401,
                    message:
                        'This website is a work in progress. You are not allowed to create an account for now, please ask someone to get a limited access',
                    error: 'Unauthorized',
                })
        })
        it('should return 201 and same content as authService.getUserTokens()', () => {
            jest.spyOn(userExistsRule, 'validate').mockImplementation(() => Promise.resolve(true))
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    email: 'email@ok.com',
                    username: 'usernameOk',
                    password: 'passwordOk',
                })
                .set('Cookie', 'pote=pote')
                .expect(201, authService.getUserTokens())
        })
    })

    describe('login', () => {
        it('should return 400 with missing password', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: 'yoyo',
                })
                .expect(400, {
                    statusCode: 400,
                    message: [{ property: 'password', errors: ['password should not be empty'] }],
                    error: 'Bad Request',
                })
        })
        it('should return 400 with missing username', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    password: 'yoyo',
                })
                .expect(400, {
                    statusCode: 400,
                    message: [{ property: 'username', errors: ['username should not be empty'] }],
                    error: 'Bad Request',
                })
        })
        it('should return 401 when wrong user', () => {
            jest.spyOn(authService, 'login').mockImplementationOnce(() => {
                throw new UnauthorizedException()
            })
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: 'usernameOk',
                    password: 'passwordNotOk',
                })
                .expect(401, { statusCode: 401, message: 'wrong password', error: 'Unauthorized' })
        })
        it('should return 200 and same content as authService.login()', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: 'usernameOk',
                    password: 'passwordOk',
                })
                .expect(200, authService.login())
        })
    })

    describe('refresh token', () => {
        let refreshToken: string
        beforeAll(() => {
            refreshToken = jwtService.sign(
                { username: 'yoyo' },
                {
                    secret: configService.get('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: '30d',
                },
            )
        })
        it('should return 401: missing refresh_token field', () => {
            return request(app.getHttpServer()).post('/auth/refresh').expect(401, {
                statusCode: 401,
                message: 'Unauthorized',
            })
        })
        it('should return 401: wrong refresh_token field', () => {
            return request(app.getHttpServer())
                .post('/auth/refresh')
                .send({
                    refreshToken: 'yoyo',
                })
                .expect(401, {
                    statusCode: 401,
                    message: 'Unauthorized',
                })
        })
        it('should return 401: user not found', () => {
            jest.spyOn(jwtRefreshTokenStrategy, 'validate').mockImplementationOnce(() =>
                Promise.resolve(undefined),
            )
            return request(app.getHttpServer())
                .post('/auth/refresh')
                .send({
                    refreshToken: refreshToken,
                })
                .expect(401, {
                    statusCode: 401,
                    message: 'Unauthorized',
                })
        })
        it('should return 201 with access token', () => {
            jest.spyOn(jwtRefreshTokenStrategy, 'validate').mockImplementationOnce(() =>
                Promise.resolve(new User()),
            )
            return request(app.getHttpServer())
                .post('/auth/refresh')
                .send({
                    refreshToken: refreshToken,
                })
                .expect(200, {
                    accessToken: authService.getJwtAccessToken(),
                })
        })
    })

    describe('logout', () => {
        let accessToken: string
        beforeAll(() => {
            accessToken = jwtService.sign(
                { username: 'yoyo' },
                {
                    secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                    expiresIn: '1h',
                },
            )
        })
        it('should return 401: missing bearer token', () => {
            return request(app.getHttpServer()).get('/auth/logout').expect(401, {
                statusCode: 401,
                message: 'Unauthorized',
            })
        })
        it('should return 401: wrong bearer token', () => {
            return request(app.getHttpServer())
                .get('/auth/logout')
                .set('Authorization', 'bearer xdd')
                .expect(401, {
                    statusCode: 401,
                    message: 'Unauthorized',
                })
        })
        it('should return 401: user not found', () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementationOnce(() => Promise.resolve(null))
            return request(app.getHttpServer())
                .get('/auth/logout')
                .set('Authorization', `bearer ${accessToken}`)
                .expect(401, {
                    statusCode: 401,
                    message: 'Unauthorized',
                })
        })
        it('should return 200', () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementationOnce(() =>
                Promise.resolve(new User()),
            )
            return request(app.getHttpServer())
                .get('/auth/logout')
                .set('Authorization', `bearer ${accessToken}`)
                .expect(200)
        })
    })
    afterAll(async () => {
        await app.close()
    })
})
