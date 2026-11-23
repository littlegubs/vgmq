import { IsNotEmpty } from 'class-validator'

export class AddDerivedGameToMusicDto {
    @IsNotEmpty()
    gameId: number
}
