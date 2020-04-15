import { Injectable } from '@angular/core'
import { User } from '../classes/user'
import { Observable, Subscription, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    endpoint = 'http://localhost:4000/api'
    headers = new HttpHeaders().set('Content-Type', 'application/json')
    currentUser = {}

    constructor(private http: HttpClient, public router: Router) {}

    // Sign-up
    signUp(user: User): Observable<any> {
        const api = `${this.endpoint}/register-user`
        return this.http.post(api, user).pipe(catchError((err) => this.handleError(err)))
    }

    // Login
    login(user: User): Subscription {
        return this.http.post<any>(`${this.endpoint}/login`, user).subscribe((res: any) => {
            localStorage.setItem('access_token', res.token)
            this.getUserProfile(res._id).subscribe((res) => {
                this.currentUser = res
                this.router.navigate(['user-profile/' + res.msg._id])
            })
        })
    }

    getToken(): string | null {
        return localStorage.getItem('access_token')
    }

    get isLoggedIn(): boolean {
        const authToken = localStorage.getItem('access_token')
        return authToken !== null
    }

    doLogout(): void {
        const removeToken = localStorage.removeItem('access_token')
        if (removeToken == null) {
            this.router.navigate(['log-in'])
        }
    }

    // User profile
    getUserProfile(id): Observable<any> {
        const api = `${this.endpoint}/user-profile/${id}`
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res: Response) => {
                return res || {}
            }),
            catchError((err) => this.handleError(err))
        )
    }

    // Error
    handleError(error: HttpErrorResponse): Observable<never> {
        let msg = ''
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`
        }
        return throwError(msg)
    }
}
