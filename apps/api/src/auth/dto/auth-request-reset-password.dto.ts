import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthRequestResetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
}
