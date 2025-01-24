import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Game, GameApiResponse, GameAutocompleteResponse, GameSearchSortBy } from '../../shared/models/game'
import { catchError } from 'rxjs/operators'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'
import { Collection } from '../../shared/models/collection'
import { Genre } from '../../shared/models/genre'
import { Theme } from '../../shared/models/theme'

@Injectable({
  providedIn: 'root',
})
export class GameHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  search(
    form: {
      query: string
      myGames?: boolean
      showDisabled?: boolean
      onlyShowWithoutMusics?: boolean
      nsfw?: boolean
      sortBy?: GameSearchSortBy
    },
    skip?: number,
    limit?: number
  ): Observable<GameApiResponse> {
    return this.http.get<GameApiResponse>(`${this.apiEndpoint}/games`, {
      params: {
        query: form.query,
        sortBy: form.sortBy,
        ...(form.myGames && { filterByUser: 'true' }),
        ...(form.showDisabled && { showDisabled: 'true' }),
        ...(form.onlyShowWithoutMusics && { onlyShowWithoutMusics: 'true' }),
        ...(skip && { skip }),
        ...(limit && { limit }),
        ...(form.nsfw && { nsfw: 'true' }),
      },
    })
  }

  importByUrl(url: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiEndpoint}/games/import`, {
        params: {
          url,
        },
      })
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(() => httpErrorResponse.error as ApiErrorInterface)
        )
      )
  }

  get(slug: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiEndpoint}/games/${slug}`)
  }

  addToList(slug: string): Observable<null> {
    return this.http.get<null>(`${this.apiEndpoint}/games/${slug}/add`)
  }

  removeFromList(slug: string): Observable<null> {
    return this.http.get<null>(`${this.apiEndpoint}/games/${slug}/remove`)
  }

  getNames(query: string, showCollection: boolean): Observable<GameAutocompleteResponse[]> {
    return this.http.get<GameAutocompleteResponse[]>(`${this.apiEndpoint}/games/names`, {
      params: { query: query, showCollection },
    })
  }

  getCollections(query: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiEndpoint}/games/collections`, {
      params: { query: query },
    })
  }

  getGenres(query: string): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiEndpoint}/games/genres`, {
      params: { query: query },
    })
  }

  getThemes(query: string): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiEndpoint}/games/themes`, {
      params: { query: query },
    })
  }
}
