import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Game, GameApiResponse, GameMusicUploadErrorResponse } from '../../shared/models/game'
import { catchError } from 'rxjs/operators'
import { AdminMusicApiErrors, Music } from '../../shared/models/music'
import { GameMusic } from '../../shared/models/game-music'
import { AlternativeName } from '../../shared/models/alternative-name'

@Injectable({
  providedIn: 'root',
})
export class GameHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  search(query: string, showDisabled: boolean): Observable<GameApiResponse> {
    return this.http.get<GameApiResponse>(`${this.apiEndpoint}/games`, {
      params: {
        query: query,
        ...(showDisabled && { showDisabled: 'true' }),
      },
    })
  }

  get(slug: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiEndpoint}/admin/games/${slug}`)
  }

  uploadMusics(slug: string, files: File[]): Observable<Game> {
    const formData = new FormData()
    for (const file of files) {
      formData.append('music_files[files][]', file)
    }

    return this.http
      .post<Game>(`${this.apiEndpoint}/admin/games/${slug}/musics/upload`, formData)
  }

  saveMusic(music: Music, data: unknown): Observable<Music> {
    return this.http
      .patch<Music>(`${this.apiEndpoint}/admin/musics/${music.id}`, data)
      .pipe(
        catchError(
          (httpErrorResponse: HttpErrorResponse): Observable<never> =>
            throwError(new AdminMusicApiErrors(httpErrorResponse.error.errors))
        )
      )
  }

  deleteGameMusic(gameMusic: GameMusic): Observable<null> {
    return this.http.delete<null>(`${this.apiEndpoint}/admin/games-musics/${gameMusic.id}`)
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
      .patch<null>(`${this.apiEndpoint}/admin/alternative-names/${alternativeName.id}/toggle`, null)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }
}
