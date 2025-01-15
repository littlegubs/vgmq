import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { User } from '../../shared/models/user'

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<Partial<User>> {
    return this.http.get<Partial<User>>(`${this.apiEndpoint}/users/current`)
  }

  updatePassword(password: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiEndpoint}/users/password/update`, { password, newPassword })
  }

  updateUsername(username: string): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.apiEndpoint}/users/username/update`, {
      username,
    })
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoint}/users`)
  }
}
