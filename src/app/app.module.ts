import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApiInterceptor } from './core/interceptors/api.interceptor'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './core/header/header.component'
import { HomeThemeComponent } from './core/theme/home/home-theme.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io'
import { CustomSocket } from './core/socket/custom.socket'

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} }
@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeThemeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
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
