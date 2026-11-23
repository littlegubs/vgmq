import { IsNotEmpty } from 'class-validator'

export class GameAlbumDto {
    @IsNotEmpty()
    name: string

    date: string
}
