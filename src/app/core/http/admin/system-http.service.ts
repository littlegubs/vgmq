import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SystemHttpService {
  private apiEndpoint = environment.apiEndpoint

  constructor(private http: HttpClient) {}

  listJobs(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.apiEndpoint}/admin/system/listJobs`)
  }

  resetPublicLobbies(): Observable<void> {
    return this.http.get<void>(`${this.apiEndpoint}/admin/system/resetPublicLobbies`)
  }
}
