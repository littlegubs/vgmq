import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { GameAlbum, GameAlbumCover } from '../../../shared/models/game-album'
import { Game } from '../../../shared/models/game'

@Injectable({
  providedIn: 'root',
})
export class AlbumsHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  edit(id: number, data: Pick<GameAlbum, 'name' | 'date'>): Observable<GameAlbum> {
    return this.http.patch<GameAlbum>(`${this.apiEndpoint}/admin/game-album/${id}`, {
      name: data.name,
      date: data.date,
    })
  }

  editCover(id: number, file: File): Observable<GameAlbumCover> {
    const formData = new FormData()
    formData.append('file', file)

    return this.http.patch<GameAlbumCover>(`${this.apiEndpoint}/admin/game-album/${id}/cover`, formData)
  }

  delete(id: number): Observable<Game> {
    return this.http.delete<Game>(`${this.apiEndpoint}/admin/game-album/${id}`)
  }
}
