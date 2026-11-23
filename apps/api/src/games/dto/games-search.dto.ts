import { IsDefined } from 'class-validator'

export class GamesSearchDto {
    @IsDefined()
    query: string
    filterByUser = false
    limit?: number
    skip?: number
    showDisabled = false
    onlyShowWithoutMusics = false
    nsfw = false
    sortBy: GameSearchSortBy
    showCollection: string
}

export enum GameSearchSortBy {
    NameAsc = 'name_asc',
    NameDesc = 'name_desc',
    CountUsersAsc = 'count_user_asc',
    CountUsersDesc = 'count_user_desc',
    CountMusicsAsc = 'count_music_asc',
    CountMusicsDesc = 'count_music_desc',
}
