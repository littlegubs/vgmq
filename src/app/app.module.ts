import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApiInterceptor } from './core/interceptors/api.interceptor'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './core/header/header.component'
import { HomeThemeComponent } from './core/theme/home/home-theme.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SocketIoModule } from 'ngx-socket-io'
import { RecaptchaModule } from 'ng-recaptcha'
import { CustomSocket } from './core/socket/custom.socket'
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeThemeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule,
    RecaptchaModule,
    MdbCollapseModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    CustomSocket,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
