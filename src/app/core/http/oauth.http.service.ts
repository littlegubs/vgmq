import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class OAuthHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  patreon(code: string): Observable<{ userFullName: string }> {
    return this.http.get<{ userFullName: string }>(`${this.apiEndpoint}/oauth/patreon?code=${code}`)
  }

  refreshPatreon(): Observable<void> {
    return this.http.get<void>(`${this.apiEndpoint}/oauth/patreon/refresh`)
  }

  unlinkPatreon(): Observable<void> {
    return this.http.get<void>(`${this.apiEndpoint}/oauth/patreon/unlink`)
  }
}
