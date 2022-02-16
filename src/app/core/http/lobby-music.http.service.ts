import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class LobbyMusicHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  get(id: string) {
    return this.http.get(`${this.apiEndpoint}/lobby-music/${id}`, {
      responseType: 'blob',
    })
  }
}
