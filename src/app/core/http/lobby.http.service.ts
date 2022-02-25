import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { catchError } from 'rxjs/operators'
import { Lobby, LobbyConfig, LobbyJoinResponse } from '../../shared/models/lobby'

@Injectable({
  providedIn: 'root',
})
export class LobbyHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  list(query: string = ''): Observable<Lobby[]> {
    return this.http.get<Lobby[]>(`${this.apiEndpoint}/lobbies`, {
      params: {
        query: query,
      },
    })
  }

  create(data: LobbyConfig): Observable<Lobby> {
    return this.http
      .post<Lobby>(`${this.apiEndpoint}/lobbies/create`, data)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }

  update(code: string, data: LobbyConfig): Observable<Lobby> {
    return this.http
      .put<Lobby>(`${this.apiEndpoint}/lobbies/${code}`, data)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }

  join(code: string, password?: string): Observable<LobbyJoinResponse> {
    const url = `${this.apiEndpoint}/lobbies/${code}/join`
    let req = this.http.get<LobbyJoinResponse>(url)
    if (password) {
      const formData = new FormData()
      formData.append('password', password)
      req = this.http.post<LobbyJoinResponse>(url, formData)
    }

    return req
  }

  leave(): Observable<null> {
    return this.http.get<null>(`${this.apiEndpoint}/lobbies/leave`)
  }

  play(code: string): Observable<null> {
    return this.http.get<null>(`${this.apiEndpoint}/lobbies/${code}/play`)
  }

  answer(code: string, answer: string): Observable<null> {
    const formData = new FormData()
    formData.append('answer', answer)

    return this.http
      .post<null>(`${this.apiEndpoint}/lobbies/${code}/answer`, formData)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }
}
