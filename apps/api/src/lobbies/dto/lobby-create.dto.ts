import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'

import { LobbyFilterType } from '../entities/lobby-collection-filter.entity'
import { LobbyDifficulties, LobbyGameModes, LobbyHintMode } from '../entities/lobby.entity'

export class LobbyCreateDto {
    @IsNotEmpty()
    @Transform(({ value }) => {
        return 'string' === typeof value ? value.trim() : value
    })
    name: string

    @Transform(({ value }) => {
        if ('string' === typeof value) {
            value = value.trim()
            if (value === '') {
                return null
            }
        }
        return value
    })
    password: string | null

    @Max(100)
    @Min(5)
    @IsNumber()
    musicNumber: number

    @Max(60)
    @Min(5)
    @IsNumber()
    guessTime: number

    @Max(100) // TODO max must be the musicNumber value, i'm too lazy right now so i'm setting a value myself in src/lobbies/services/lobby-music-loader.service.ts:179
    @Min(0)
    @IsNumber()
    playedMusics: number

    allowDuplicates: boolean
    difficulty: LobbyDifficulties[]
    allowContributeToMissingData: boolean
    gameMode: LobbyGameModes
    playMusicOnAnswerReveal: boolean
    showCorrectAnswersDuringGuessTime: boolean
    allowVoteSkipGuessing: boolean
    allowVoteSkipAnswerReveal: boolean

    @IsNotEmpty()
    hintMode: LobbyHintMode

    collectionFilters: {
        id: number
        type: LobbyFilterType
        limitation: number
    }[]
    genreFilters: {
        id: number
        type: LobbyFilterType
        limitation: number
    }[]
    themeFilters: {
        id: number
        type: LobbyFilterType
        limitation: number
    }[]
}
