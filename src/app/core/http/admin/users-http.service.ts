import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PaginatedUsersResponse, GraphData } from '../../../shared/models/user'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  getAllUsers(
    page: number,
    limit: number,
    search?: string,
    sort?: string,
    order?: string
  ): Observable<PaginatedUsersResponse> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString())

    if (search) {
      params = params.set('search', search)
    }
    if (sort) {
      params = params.set('sort', sort)
    }
    if (order) {
      params = params.set('order', order)
    }

    return this.http.get<PaginatedUsersResponse>(`${this.apiEndpoint}/admin/users`, { params })
  }

  getUsersGraphData(): Observable<GraphData[]> {
    return this.http.get<GraphData[]>(`${this.apiEndpoint}/admin/users/stats`)
  }

  ban(id: string, banReason: string): Observable<void> {
    return this.http.put<void>(`${this.apiEndpoint}/admin/users/ban/${id}`, { banReason })
  }
}
