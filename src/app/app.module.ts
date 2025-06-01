import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ApiInterceptor } from './core/interceptors/api.interceptor'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './core/header/header.component'
import { HomeThemeComponent } from './core/theme/home/home-theme.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SocketIoModule } from 'ngx-socket-io'
import { LobbySocket } from './core/socket/lobby.socket'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'
import { AnonymousComponent } from './core/theme/home/anonymous/anonymous.component'
import { HomeModule } from './modules/home/home.module'
import { LoggedInComponent } from './core/theme/home/logged-in/logged-in.component'
import { LoginModule } from './modules/login/login.module'
import { LobbyListSocket } from './core/socket/lobby-list.socket'
import { LobbyFileSocket } from './core/socket/lobby-file.socket'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { OauthModule } from './modules/oauth/oauth.module'
import { MaintenanceComponent } from './core/theme/home/maintenance/maintenance.component'

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeThemeComponent, AnonymousComponent, LoggedInComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule,
    MdbCollapseModule,
    HomeModule,
    LoginModule,
    OauthModule,
    MaintenanceComponent,
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
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
