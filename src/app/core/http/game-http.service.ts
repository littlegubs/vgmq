import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Game, GameApiResponse } from '../../shared/models/game'

@Injectable({
  providedIn: 'root',
})
export class GameHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  search(
    form: { query: string; myGames: boolean },
    skip?: number,
    limit?: number
  ): Observable<GameApiResponse<number>> {
    return this.http.get<GameApiResponse<number>>(`${this.apiEndpoint}/games`, {
      params: {
        query: form.query,
        ...(form.myGames && { filterByUser: 'true' }),
        ...(skip && { skip }),
        ...(limit && { limit }),
      },
    })
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

  getNames(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiEndpoint}/games/names`, { params: { query: query } })
  }
}