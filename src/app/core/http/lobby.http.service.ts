import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { catchError, map } from 'rxjs/operators'
import { Lobby, LobbyJoinResponse } from '../../shared/models/lobby'

@Injectable({
  providedIn: 'root',
})
export class LobbyHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  list(): Observable<Lobby[]> {
    return this.http
      .get<Lobby[]>(`${this.apiEndpoint}/lobbies`)
      .pipe(map((res) => res.map((lobby) => new Lobby(lobby))))
  }

  create(data: Lobby): Observable<Lobby> {
    return this.http.post<Lobby>(`${this.apiEndpoint}/lobbies/create`, data).pipe(
      map((res) => new Lobby(res)),
      catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
    )
  }

  update(code: string, data: Lobby): Observable<Lobby> {
    return this.http.put<Lobby>(`${this.apiEndpoint}/lobbies/${code}`, data).pipe(
      map((res) => new Lobby(res)),
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
    return req.pipe(map((res) => new LobbyJoinResponse(res)))
  }

  play(code: string): Observable<null> {
    return this.http.get<null>(`${this.apiEndpoint}/lobbies/${code}/play`)
  }
}
