import { IsNotEmpty } from 'class-validator'

export class LinkGameToMusicDto {
    @IsNotEmpty()
    gameToMusicId: number
}
