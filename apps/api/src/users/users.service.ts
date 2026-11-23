import { randomBytes } from 'crypto'

import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { DateTime } from 'luxon'
import { IsNull, LessThan, Or, Repository } from 'typeorm'

import { AuthRegisterDto } from '../auth/dto/auth-register.dto'
import { Game } from '../games/entity/game.entity'
import { OauthPatreon } from '../oauth/entities/oauth-patreon.entity'
import { PatreonService } from '../oauth/services/patreon.service'
import { Role } from './role.enum'
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(OauthPatreon) private oAuthPatreonRepository: Repository<OauthPatreon>,
        private patreonService: PatreonService,
        private mailerService: MailerService,
        private configService: ConfigService,
    ) {}

    async create(createUserDto: AuthRegisterDto): Promise<void> {
        const user = this.userRepository.create(createUserDto)
        const vgmqClientUrl = this.configService.get<string>('VGMQ_CLIENT_URL')
        if (vgmqClientUrl === undefined) {
            throw new InternalServerErrorException()
        }
        const token = randomBytes(16).toString('hex')
        await this.userRepository.save(
            this.userRepository.create({ ...user, confirmationToken: token }),
        )
        const url = `${vgmqClientUrl}/register/${token}`
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Confirm your VGMQ account',
            template: 'confirmation',
            context: {
                url: url,
            },
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({
            relations: { patreonAccount: true },

            where: {
                email: email,
            },
        })
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({
            relations: { patreonAccount: true },
            where: {
                username: username,
                enabled: true,
            },
        })
    }

    async findByConfirmationToken(token: string): Promise<User | null> {
        return this.userRepository.findOne({
            relations: { patreonAccount: true },
            where: {
                confirmationToken: token,
            },
        })
    }

    userHasPlayedTheGame(user: User, game: Game): Promise<User | null> {
        return this.userRepository
            .createQueryBuilder('user')
            .innerJoin('user.games', 'game')
            .andWhere('game.id = :gameId', { gameId: game.id })
            .andWhere('user.id = :id', { id: user.id })
            .getOne()
    }

    async isUserPremium(user: User, refreshData = false): Promise<boolean> {
        let oauthPatreon = user.patreonAccount
            ? await this.oAuthPatreonRepository.findOne({
                  where: { id: user.patreonAccount.id },
              })
            : null
        if (oauthPatreon && refreshData) {
            const { access_token, refresh_token } = await this.patreonService.refreshAccessToken(
                oauthPatreon.refreshToken,
            )
            oauthPatreon = {
                ...oauthPatreon,
                accessToken: access_token,
                refreshToken: refresh_token,
            }
            await this.oAuthPatreonRepository.save(oauthPatreon)
            oauthPatreon = await this.patreonService.refreshData(oauthPatreon)
        }
        return !!(
            oauthPatreon?.currentlyEntitledTiers?.some(
                (tier) =>
                    tier === this.configService.get('PATREON_TIER_1_ID') ||
                    tier === this.configService.get('PATREON_TIER_2_ID'),
            ) ||
            user.roles?.some((role) => [Role.Admin, Role.SuperAdmin].includes(role as Role)) ||
            this.configService
                .get<string>('PATREON_TIER_1_FREE_ACCESS')
                ?.split(',')
                .includes(String(user.id))
        )
    }

    /**
     * Verify every 15 days if the user is still premium
     */
    @Cron(CronExpression.EVERY_DAY_AT_6PM)
    async cronUserPremium(): Promise<void> {
        const users = await this.userRepository.find({
            where: {
                premiumCachedAt: Or(
                    LessThan(DateTime.now().minus({ days: 15 }).toJSDate()),
                    IsNull(),
                ),
            },
        })
        for (const user of users) {
            try {
                await this.userRepository.save({
                    ...user,
                    premium: await this.isUserPremium(user, true),
                    premiumCachedAt: new Date(),
                })
            } catch (e) {
                console.error(
                    `Failed to refresh premium status for user ${user.id}. Error : ${e.message}`,
                )
            }
        }
    }
}
