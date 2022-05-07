import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private userLoggedInSubject = new BehaviorSubject<boolean>(this.cookieService.check('vgmq-ut-hp'))

  public readonly userLoggedIn: Observable<boolean> = this.userLoggedInSubject.asObservable()

  constructor(private cookieService: CookieService) {}

  isUserLoggedIn(): boolean {
    return this.userLoggedInSubject.getValue()
  }

  setUserLoggedIn(bool: boolean): void {
    this.userLoggedInSubject.next(bool)
  }
}
