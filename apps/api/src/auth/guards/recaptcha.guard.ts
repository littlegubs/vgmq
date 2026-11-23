import { HttpService } from '@nestjs/axios'
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class RecaptchaGuard implements CanActivate {
    constructor(private readonly httpService: HttpService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { body } = context.switchToHttp().getRequest()
        return this.httpService
            .post<{
                success: boolean
            }>(
                `https://www.google.com/recaptcha/api/siteverify?response=${body.recaptcha}&secret=${process.env.RECAPTCHA_SECRET_KEY}`,
            )
            .pipe(
                map((res) => {
                    if (!res.data.success) {
                        throw new BadRequestException('Invalid captcha')
                    }
                    return true
                }),
            )
    }
}
