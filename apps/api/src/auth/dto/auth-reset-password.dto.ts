import { IsNotEmpty } from 'class-validator'

export class AuthResetPasswordDto {
    @IsNotEmpty()
    password: string
}
