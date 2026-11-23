import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private userLoggedInSubject: BehaviorSubject<boolean>

  public readonly userLoggedIn: Observable<boolean>

  constructor(private cookieService: CookieService) {
    this.userLoggedInSubject = new BehaviorSubject<boolean>(this.cookieService.check('vgmq-ut-hp'))
    this.userLoggedIn = this.userLoggedInSubject.asObservable()
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedInSubject.getValue()
  }

  setUserLoggedIn(bool: boolean): void {
    this.userLoggedInSubject.next(bool)
  }
}
