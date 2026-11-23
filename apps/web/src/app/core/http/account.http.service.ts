import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AccountHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  updateGameList(IGDBUsername: string): Observable<{}> {
    return this.http
      .post<{}>(`${this.apiEndpoint}/update-game-list`, { IGDBUsername })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => throwError(httpErrorResponse.error))
      )
  }
}
