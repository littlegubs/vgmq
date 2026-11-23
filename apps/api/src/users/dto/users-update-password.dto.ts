import { IsNotEmpty } from 'class-validator'

export class UsersUpdatePasswordDto {
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    newPassword: string
}
