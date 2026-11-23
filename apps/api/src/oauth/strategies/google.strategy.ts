import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Repository } from 'typeorm'

import { User } from '../../users/user.entity'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET')!,
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: ['profile', 'email'],
            passReqToCallback: false,
        })
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: {
            id: string
            emails: { value: string; verified: boolean }[]
            name: { givenName: string; familyName: string }
        },
        done: VerifyCallback,
    ): Promise<any> {
        const users = await Promise.all(
            profile.emails.map((email) =>
                this.userRepository.findOne({ where: { email: email.value } }),
            ),
        )
        let user = users.find((user) => user !== null)
        if (!user) {
            user = this.userRepository.create({
                email: profile.emails[0]?.value,
                username: await this.generateUsername(`${profile.name.givenName}`),
                password: null,
                enabled: true,
            })
            await this.userRepository.save(user)
        }
        done(null, user)
    }

    async generateUsername(username: string, retry = 0): Promise<string> {
        let nextUsername = username
        if (retry > 0) {
            nextUsername = `${username}${retry}`
        }
        if (await this.userRepository.exists({ where: { username: nextUsername } })) {
            retry++
            return this.generateUsername(username, retry)
        }
        return nextUsername
    }
}
