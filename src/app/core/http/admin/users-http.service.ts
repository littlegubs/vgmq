import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserFromAdmin } from '../../../shared/models/user'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  getStats(): Observable<UserFromAdmin[]> {
    return this.http.get<UserFromAdmin[]>(`${this.apiEndpoint}/admin/users`)
  }

  ban(id: string, banReason: string): Observable<void> {
    return this.http.put<void>(`${this.apiEndpoint}/admin/users/ban/${id}`, { banReason })
  }
}
