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

  join(code: string): Observable<LobbyJoinResponse> {
    return this.http.get<LobbyJoinResponse>(`${this.apiEndpoint}/lobbies/${code}/join`).pipe(
      map((res) => new LobbyJoinResponse(res)),
      catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
    )
  }
}
