import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Game, GameApiResponse } from '../../shared/models/game'
import { catchError } from 'rxjs/operators'
import { Music } from '../../shared/models/music'
import { GameToMusic } from '../../shared/models/game-to-music'
import { AlternativeName } from '../../shared/models/alternative-name'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'

@Injectable({
  providedIn: 'root',
})
export class GameHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  search(query: string, showDisabled: boolean, page?: number, limit?: number): Observable<GameApiResponse> {
    return this.http.get<GameApiResponse>(`${this.apiEndpoint}/games`, {
      params: {
        query: query,
        ...(showDisabled && { showDisabled: 'true' }),
        ...(page && { page }),
        ...(limit && { limit }),
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
            throwError(httpErrorResponse.error as ApiErrorInterface)
        )
      )
  }

  get(slug: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiEndpoint}/games/${slug}`)
  }

  uploadMusics(slug: string, files: File[]): Observable<Game> {
    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    return this.http.post<Game>(`${this.apiEndpoint}/games/${slug}/musics`, formData)
  }

  saveMusic(music: Music, data: unknown): Observable<Music> {
    return this.http.patch<Music>(`${this.apiEndpoint}/musics/${music.id}`, data)
  }

  deleteGameMusic(gameMusic: GameToMusic): Observable<null> {
    return this.http.delete<null>(`${this.apiEndpoint}/game-to-music/${gameMusic.id}`)
  }

  toggleGame(game: Game): Observable<Game> {
    return this.http
      .patch<Game>(`${this.apiEndpoint}/games/${game.slug}/toggle`, null)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }

  toggleAlternativeName(alternativeName: AlternativeName): Observable<null> {
    return this.http
      .patch<null>(`${this.apiEndpoint}/alternative-names/${alternativeName.id}/toggle`, null)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }
}
