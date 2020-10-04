import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import { environment } from '../../../environments/environment'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
      ...(!environment.production && {
        setHeaders: {
          Authorization: `Bearer ${this.cookieService.get('vgmq-ut-hp')}.${this.cookieService.get('vgmq-ut-s')}`,
        },
      }),
    })
    return next.handle(req)
  }
}
