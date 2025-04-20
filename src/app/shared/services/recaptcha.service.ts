import { EventEmitter, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

declare global {
  interface Window {
    grecaptcha: any
  }
}

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  public resolved = new EventEmitter<string>()

  render(): void {
    window.grecaptcha.render('g-recaptcha', {
      sitekey: environment.recaptchaKey,
      size: 'invisible',
      callback: (token: string) => {
        this.resolved.emit(token)
      },
    })
  }

  public execute(): void {
    window.grecaptcha.execute()
  }

  public reset(): void {
    window.grecaptcha.reset()
  }
}
