import { IsUrl } from 'class-validator'

export class GamesImportDto {
    @IsUrl(
        {
            host_whitelist: ['www.igdb.com'],
        },
        { message: 'url must a valid URL address' },
    )
    url: string
}
