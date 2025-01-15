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
import { LobbySocket } from './core/socket/lobby.socket'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'
import { AnonymousComponent } from './core/theme/home/anonymous/anonymous.component'
import { HomeModule } from './modules/home/home.module'
import { LoggedInComponent } from './core/theme/home/logged-in/logged-in.component'
import { LoginModule } from './modules/login/login.module'
import { LobbyListSocket } from './core/socket/lobby-list.socket'
import { LobbyFileSocket } from './core/socket/lobby-file.socket';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { OauthModule } from "./modules/oauth/oauth.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeThemeComponent, AnonymousComponent, LoggedInComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule,
    RecaptchaModule,
    MdbCollapseModule,
    HomeModule,
    LoginModule,
    OauthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    LobbySocket,
    LobbyListSocket,
    LobbyFileSocket,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
