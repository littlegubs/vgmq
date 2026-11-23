import { IsNotEmpty, IsString } from 'class-validator'

export class AdminBanDto {
    @IsNotEmpty()
    @IsString()
    banReason: string
}
