import { IsDefined } from 'class-validator'

export class LobbySearchDto {
    @IsDefined()
    query: string

    filterByUser = false

    limit?: number

    page?: number
}
