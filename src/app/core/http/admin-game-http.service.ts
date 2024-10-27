import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Game, GameApiResponse } from '../../shared/models/game'
import { catchError } from 'rxjs/operators'
import { GameToMusic } from '../../shared/models/game-to-music'
import { AlternativeName } from '../../shared/models/alternative-name'
import { ApiErrorInterface } from '../../shared/models/api-error.interface'

@Injectable({
  providedIn: 'root',
})
export class AdminGameHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  search(
    form: { query: string; showDisabled: boolean; onlyShowWithoutMusics: boolean },
    skip?: number,
    limit?: number
  ): Observable<GameApiResponse> {
    return this.http.get<GameApiResponse>(`${this.apiEndpoint}/admin/games`, {
      params: {
        query: form.query,
        ...(form.showDisabled && { showDisabled: 'true' }),
        ...(form.onlyShowWithoutMusics && { onlyShowWithoutMusics: 'true' }),
        ...(skip && { skip }),
        ...(limit && { limit }),
      },
    })
  }

  importByUrl(url: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiEndpoint}/admin/games/import`, {
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

  get(slug: string): Observable<{ game: Game; free: number; size: number }> {
    return this.http.get<{ game: Game; free: number; size: number }>(`${this.apiEndpoint}/admin/games/${slug}`)
  }

  uploadMusics(slug: string, files: File[]): Observable<HttpEvent<Game>> {
    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    return this.http.post<Game>(`${this.apiEndpoint}/admin/games/${slug}/musics`, formData, {
      reportProgress: true,
      observe: 'events',
    })
  }

  saveMusic(id: number, data: unknown): Observable<GameToMusic> {
    return this.http.patch<GameToMusic>(`${this.apiEndpoint}/admin/game-to-music/${id}`, data)
  }

  deleteGameMusic(gameMusic: GameToMusic): Observable<null> {
    return this.http.delete<null>(`${this.apiEndpoint}/admin/game-to-music/${gameMusic.id}`)
  }

  toggleGame(game: Game): Observable<Game> {
    return this.http
      .patch<Game>(`${this.apiEndpoint}/admin/games/${game.slug}/toggle`, null)
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

  listen(id: number): Observable<Blob> {
    return this.http.get(`${this.apiEndpoint}/admin/game-to-music/${id}/listen`, {
      responseType: 'blob',
    })
  }

  addDerivedGameToMusic(gameToMusicId: number, game: Game): Observable<GameToMusic> {
    return this.http
      .post<null>(`${this.apiEndpoint}/admin/game-to-music/${gameToMusicId}/add-derived`, {
        gameId: game.id,
      })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }

  link(originalGameToMusicId: number, derivedGameToMusicId: string): Observable<GameToMusic> {
    return this.http
      .patch<null>(`${this.apiEndpoint}/admin/game-to-music/${originalGameToMusicId}/link`, {
        gameToMusicId: derivedGameToMusicId,
      })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }

  unlink(originalGameToMusicId: number, derivedGameToMusicId: number): Observable<GameToMusic> {
    return this.http
      .patch<null>(`${this.apiEndpoint}/admin/game-to-music/${originalGameToMusicId}/unlink`, {
        gameToMusicId: derivedGameToMusicId,
      })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }

  createAlbum(slug: string): Observable<Game> {
    return this.http.post<Game>(`${this.apiEndpoint}/admin/games/${slug}/create-album`, null)
  }

  generateAlbums(slug: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiEndpoint}/admin/games/${slug}/generate-albums`)
  }
}
