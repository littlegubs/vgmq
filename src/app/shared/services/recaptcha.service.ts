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

  private waitForGrecaptcha(): Promise<void> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        clearInterval(interval)
      }, 1000)

      const interval = setInterval(() => {
        if (window.grecaptcha?.render instanceof Function) {
          clearTimeout(timeout)
          clearInterval(interval)
          resolve()
        }
      }, 100)
    })
  }

  public async render(): Promise<void> {
    await this.waitForGrecaptcha()

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
