import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
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
  declarations: [CardComponent],
  imports: [CommonModule, SocketIoModule.forRoot(configSocket)],
  exports: [CardComponent],
})
export class CardsModule {}
