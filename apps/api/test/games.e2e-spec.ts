import {
    BadRequestException,
    HttpException,
    INestApplication,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { useContainer } from 'class-validator'
import * as request from 'supertest'

import { JwtStrategy } from '../src/auth/strategies/jwt.strategy'
import { exceptionPipe } from '../src/exception.pipe'
import { AdminGamesController } from '../src/games/admin-games.controller'
import { Game } from '../src/games/entity/game.entity'
import { GamesService } from '../src/games/services/games.service'
import { IgdbService } from '../src/games/services/igdb.service'
import { Role } from '../src/users/role.enum'
import { User } from '../src/users/user.entity'
import { UsersService } from '../src/users/users.service'

describe('GamesController (e2e)', () => {
    let app: INestApplication
    const gameService = {
        findByName: (): Promise<[Game[], number]> => Promise.resolve([[], 0]),
    }
    let jwtService: JwtService
    let configService: ConfigService
    let jwtStrategy: JwtStrategy
    let igdbService: IgdbService
    const importedGame: Game = {
        ...new Game(),
        name: 'game',
        parent: { ...new Game(), name: 'parentGame' },
        versionParent: { ...new Game(), name: 'versionParent' },
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
            controllers: [AdminGamesController],
            providers: [
                {
                    provide: IgdbService,
                    useValue: {
                        importByUrl: (): Promise<Game> => {
                            return Promise.resolve(importedGame)
                        },
                    },
                },
                {
                    provide: GamesService,
                    useValue: gameService,
                },
                {
                    provide: UsersService,
                    useValue: {},
                },
                JwtStrategy,
                ConfigService,
            ],
        }).compile()

        app = moduleFixture.createNestApplication()
        useContainer(app, { fallbackOnErrors: true })
        app.useGlobalPipes(exceptionPipe)
        jwtService = moduleFixture.get(JwtService)
        configService = moduleFixture.get(ConfigService)
        jwtStrategy = moduleFixture.get(JwtStrategy)
        igdbService = moduleFixture.get(IgdbService)

        await app.init()
    })
    let accessToken: string
    beforeAll(() => {
        accessToken = jwtService.sign(
            { username: 'yoyo' },
            {
                secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: '1h',
            },
        )
        jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
            Promise.resolve({ roles: [Role.User] } as User),
        )
    })
    describe('(GET) games', () => {
        it('should return 401: not connected', async () => {
            return request(app.getHttpServer()).get('/games').expect(401, {
                statusCode: 401,
                message: 'Unauthorized',
            })
        })
        it('should return 401: wrong bearer token', () => {
            return request(app.getHttpServer())
                .get('/games')
                .set('Authorization', 'bearer xdd')
                .expect(401, {
                    statusCode: 401,
                    message: 'Unauthorized',
                })
        })
        it('should return 400: missing query field', async () => {
            return request(app.getHttpServer())
                .get('/games')
                .set('Authorization', `bearer ${accessToken}`)
                .expect(400, {
                    error: 'Bad Request',
                    message: [
                        {
                            errors: ['query should not be null or undefined'],
                            property: 'query',
                        },
                    ],
                    statusCode: 400,
                })
        })
        it('should return 200', async () => {
            return request(app.getHttpServer())
                .get('/games')
                .query({
                    query: 'yoyo',
                })
                .set('Authorization', `bearer ${accessToken}`)
                .expect(
                    200,
                    await gameService.findByName().then(([data, count]) => {
                        return { data, count }
                    }),
                )
        })
    })

    describe('(GET) import game', () => {
        it('should return 401: not connected', async () => {
            return request(app.getHttpServer()).get('/games/import').expect(401, {
                statusCode: 401,
                message: 'Unauthorized',
            })
        })
        it('should return 401: wrong bearer token', () => {
            return request(app.getHttpServer())
                .get('/games/import')
                .set('Authorization', 'bearer xdd')
                .expect(401, {
                    statusCode: 401,
                    message: 'Unauthorized',
                })
        })
        it('should return 401: user not found', () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementationOnce(() =>
                Promise.resolve(undefined),
            )
            return request(app.getHttpServer())
                .get('/games/import')
                .set('Authorization', `bearer ${accessToken}`)
                .expect(401, {
                    statusCode: 401,
                    message: 'Unauthorized',
                })
        })
        it('should return 403: user not admin', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementationOnce(() =>
                Promise.resolve({ roles: [Role.User] } as User),
            )
            return request(app.getHttpServer())
                .get('/games/import')
                .set('Authorization', `bearer ${accessToken}`)
                .expect(403, { statusCode: 403, message: 'Forbidden resource', error: 'Forbidden' })
        })
        it('should return 400: missing url property', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
                Promise.resolve({ roles: [Role.User, Role.Admin] } as User),
            )
            return request(app.getHttpServer())
                .get('/games/import')
                .set('Authorization', `bearer ${accessToken}`)
                .expect(400, {
                    error: 'Bad Request',
                    message: [
                        {
                            errors: ['url must a valid URL address'],
                            property: 'url',
                        },
                    ],
                    statusCode: 400,
                })
        })
        it('should return 400: url not from igdb domain', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
                Promise.resolve({ roles: [Role.User, Role.Admin] } as User),
            )
            return request(app.getHttpServer())
                .get('/games/import')
                .query({
                    url: 'https://google.com',
                })
                .set('Authorization', `bearer ${accessToken}`)
                .expect(400, {
                    error: 'Bad Request',
                    message: [
                        {
                            errors: ['url must a valid URL address'],
                            property: 'url',
                        },
                    ],
                    statusCode: 400,
                })
        })
        it('should return 404', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
                Promise.resolve({ roles: [Role.User, Role.Admin] } as User),
            )
            jest.spyOn(igdbService, 'import').mockImplementationOnce(() => {
                throw new NotFoundException('the game was not found')
            })
            return request(app.getHttpServer())
                .get('/games/import')
                .query({
                    url: 'https://www.igdb.com',
                })
                .set('Authorization', `bearer ${accessToken}`)
                .expect(404, {
                    error: 'Not Found',
                    message: 'the game was not found',
                    statusCode: 404,
                })
        })
        it('should return 400', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
                Promise.resolve({ roles: [Role.User, Role.Admin] } as User),
            )
            jest.spyOn(igdbService, 'import').mockImplementationOnce(() => {
                throw new BadRequestException('the game has no release date')
            })
            return request(app.getHttpServer())
                .get('/games/import')
                .query({
                    url: 'https://www.igdb.com',
                })
                .set('Authorization', `bearer ${accessToken}`)
                .expect(400, {
                    error: 'Bad Request',
                    message: 'the game has no release date',
                    statusCode: 400,
                })
        })
        it('should return 429', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
                Promise.resolve({ roles: [Role.User, Role.Admin] } as User),
            )
            jest.spyOn(igdbService, 'import').mockImplementationOnce(() => {
                throw new HttpException('IGDB api limit reached, please try again later', 429)
            })
            return request(app.getHttpServer())
                .get('/games/import')
                .query({
                    url: 'https://www.igdb.com',
                })
                .set('Authorization', `bearer ${accessToken}`)
                .expect(429, {
                    message: 'IGDB api limit reached, please try again later',
                    statusCode: 429,
                })
        })
        it('should return 500', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
                Promise.resolve({ roles: [Role.User, Role.Admin] } as User),
            )
            jest.spyOn(igdbService, 'import').mockImplementationOnce(() => {
                throw new InternalServerErrorException()
            })
            return request(app.getHttpServer())
                .get('/games/import')
                .query({
                    url: 'https://www.igdb.com',
                })
                .set('Authorization', `bearer ${accessToken}`)
                .expect(500, {
                    message: 'Internal Server Error',
                    statusCode: 500,
                })
        })
        it('should return 201', async () => {
            jest.spyOn(jwtStrategy, 'validate').mockImplementation(() =>
                Promise.resolve({ roles: [Role.User, Role.Admin] } as User),
            )
            return request(app.getHttpServer())
                .get('/games/import')
                .query({
                    url: 'https://www.igdb.com',
                })
                .set('Authorization', `bearer ${accessToken}`)
                .expect(201, [
                    importedGame.name,
                    importedGame.parent?.name,
                    importedGame.versionParent?.name,
                ])
        })
    })

    afterAll(async () => {
        await app.close()
    })
})
