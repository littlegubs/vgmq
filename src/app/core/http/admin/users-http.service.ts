import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AdminUsersStats } from '../../../shared/models/user'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminUsersStats> {
    return this.http.get<AdminUsersStats>(`${this.apiEndpoint}/admin/users`)
  }
}
