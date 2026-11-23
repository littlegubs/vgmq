import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'
import { Repository } from 'typeorm'
import { DeepPartial } from 'typeorm/common/DeepPartial'

import { User } from '../../users/user.entity'
import { OauthPatreon } from '../entities/oauth-patreon.entity'

interface PatreonToken {
    access_token: string
    refresh_token: string
    expires_in: string
    scope: string
    token_type: 'Bearer'
}

interface PatreonIdentity {
    data: {
        attributes: {
            full_name: string
        }
        id: string
        relationships: {
            memberships: {
                data: {
                    id: string
                    type: 'member'
                }[]
            }
        }
        type: 'user'
    }
    included?: Array<
        | {
              attributes: {
                  campaign_lifetime_support_cents: number
                  patron_status: 'active_patron' | 'declined_patron' | 'former_patron'
                  pledge_relationship_start: string
              }
              id: string
              relationships: {
                  currently_entitled_tiers: {
                      data: {
                          id: string
                          type: 'tier'
                      }[]
                  }
              }
              type: 'member'
          }
        | {
              attributes: NonNullable<unknown>
              id: '2873824'
              type: 'tier'
          }
    >
    links: {
        self: string
    }
}

@Injectable()
export class PatreonService {
    private readonly patreonClientId: string
    private readonly patreonClientSecret: string
    private readonly VGMQClientUrl: string

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
        @InjectRepository(OauthPatreon) private oauthPatreonRepository: Repository<OauthPatreon>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        const patreonClientId = this.configService.get('PATREON_CLIENT_ID')
        const patreonClientSecret = this.configService.get('PATREON_CLIENT_SECRET')
        const VGMQClientUrl = this.configService.get('VGMQ_CLIENT_URL')

        if (
            patreonClientId === undefined ||
            patreonClientSecret === undefined ||
            VGMQClientUrl === undefined
        ) {
            throw new InternalServerErrorException()
        }
        this.patreonClientId = patreonClientId
        this.patreonClientSecret = patreonClientSecret
        this.VGMQClientUrl = VGMQClientUrl

        // TODO, uh oh, this interceptor also intercept requests from Discord and everything else, fix this
        this.httpService.axiosRef.interceptors.response.use(
            (response) => {
                return response
            },
            async (error: AxiosError) => {
                if (error.response?.status === 429) {
                    throw new HttpException(
                        'Patreon api limit reached, please try again later',
                        429,
                    )
                }
                await Promise.reject(error)
            },
        )
    }

    async linkUserToPatreon(
        code: string,
        user: User,
    ): Promise<{ entity: DeepPartial<OauthPatreon>; fullName: string }> {
        const formData = new FormData()
        formData.append('code', code)
        formData.append('grant_type', 'authorization_code')
        formData.append('client_id', this.patreonClientId)
        formData.append('client_secret', this.patreonClientSecret)
        formData.append('redirect_uri', `${this.VGMQClientUrl}/oauth/patreon`)
        const { data: tokenData } = await firstValueFrom(
            this.httpService.post<PatreonToken>(
                'https://www.patreon.com/api/oauth2/token',
                formData,
            ),
        )

        const identityData = await this.getIdentity(tokenData)
        let oauthPatreon: DeepPartial<OauthPatreon> | null =
            await this.oauthPatreonRepository.findOne({
                relations: { user: true },
                where: {
                    patreonUserId: identityData.data.id,
                },
            })
        if (oauthPatreon === null) {
            oauthPatreon = this.oauthPatreonRepository.create({
                patreonUserId: identityData.data.id,
            })
        }
        oauthPatreon = {
            ...oauthPatreon,
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            user: {
                id: user.id,
            },
        }
        oauthPatreon = this.setIdentityDataInEntity(identityData, oauthPatreon)
        oauthPatreon = await this.oauthPatreonRepository.save(oauthPatreon)

        return { entity: oauthPatreon, fullName: identityData.data.attributes.full_name }
    }

    private setIdentityDataInEntity(
        identityData: PatreonIdentity,
        oauthPatreon: DeepPartial<OauthPatreon>,
    ): DeepPartial<OauthPatreon> {
        // Information about the user pledge should be in the first array, still making sure tho
        if (identityData.included?.[0] && identityData.included[0].type === 'member') {
            oauthPatreon = {
                ...oauthPatreon,
                campaignLifetimeSupportCents:
                    identityData.included[0].attributes.campaign_lifetime_support_cents,
                currentlyEntitledTiers:
                    identityData.included[0].relationships.currently_entitled_tiers.data.map(
                        (tier) => tier.id,
                    ),
            }
        }
        return oauthPatreon
    }

    async unlinkUserToPatreon(user: User): Promise<void> {
        const oauthPatreon = await this.oauthPatreonRepository.findOne({
            relations: { user: true },
            where: {
                user: { id: user.id },
            },
        })
        if (oauthPatreon !== null) {
            await this.oauthPatreonRepository.remove(oauthPatreon)
            await this.userRepository.save({ ...user, premiumCachedAt: null })
        }
    }

    private async getIdentity(
        tokenData: Pick<PatreonToken, 'access_token' | 'refresh_token'>,
    ): Promise<PatreonIdentity> {
        const { data: identityData } = await firstValueFrom(
            this.httpService
                .get<PatreonIdentity>(
                    `https://www.patreon.com/api/oauth2/v2/identity?fields[user]=full_name&include=memberships.currently_entitled_tiers&fields[member]=patron_status,pledge_relationship_start,campaign_lifetime_support_cents`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData.access_token}`,
                        },
                    },
                )
                .pipe(
                    catchError(async (error: AxiosError) => {
                        if (error.response?.status === 401) {
                            const { access_token } = await this.refreshAccessToken(
                                tokenData.refresh_token,
                            )
                            error.config!.headers['Authorization'] = `Bearer ${access_token}`
                            return this.httpService.axiosRef(error.config!)
                        }
                        throw new InternalServerErrorException()
                    }),
                ),
        )
        return identityData
    }

    public async refreshData(oauthPatreon: OauthPatreon): Promise<OauthPatreon> {
        const identityData = await this.getIdentity({
            access_token: oauthPatreon.accessToken,
            refresh_token: oauthPatreon.refreshToken,
        })

        oauthPatreon = this.setIdentityDataInEntity(identityData, oauthPatreon) as OauthPatreon
        await this.oauthPatreonRepository.save(oauthPatreon)
        return oauthPatreon
    }

    async refreshAccessToken(refreshToken: string): Promise<PatreonToken> {
        const formData = new FormData()
        formData.append('grant_type', 'refresh_token')
        formData.append('refresh_token', refreshToken)
        formData.append('client_id', this.patreonClientId)
        formData.append('client_secret', this.patreonClientSecret)
        const response = await this.httpService.axiosRef.post<PatreonToken>(
            'https://www.patreon.com/api/oauth2/token',
            formData,
        )

        return response.data
    }
}
