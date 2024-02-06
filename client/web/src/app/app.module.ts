import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import config from 'config/config';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

let user = JSON.parse(localStorage.getItem('user') || '{}');
let token = user && user.token ? user.token : '';

const configSocket: SocketIoConfig = {
  url: config.URL_API_SOCKET,
  options: {
    auth: {
      'x-token': token,
    },
    autoConnect: true,
    transports: ['websocket'],
    forceNew: true,
    withCredentials: true,
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SocketIoModule.forRoot(configSocket),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
