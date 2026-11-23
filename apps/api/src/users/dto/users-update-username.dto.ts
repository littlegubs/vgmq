import { IsNotEmpty } from 'class-validator'

export class UsersUpdateUsernameDto {
    @IsNotEmpty()
    username: string
}
