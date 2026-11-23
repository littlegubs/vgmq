import { IsEmail, IsNotEmpty, Validate } from 'class-validator'

import { UserExistsRule } from '../../users/unique.validator'

export class AuthRegisterDto {
    @IsNotEmpty()
    @IsEmail()
    @Validate(UserExistsRule)
    email: string

    @IsNotEmpty()
    @Validate(UserExistsRule)
    username: string

    @IsNotEmpty()
    password: string
}
