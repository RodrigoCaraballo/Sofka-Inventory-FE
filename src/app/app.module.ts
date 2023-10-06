import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import { NavbarComponent } from './ui/common/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot({
      url: 'ws://localhost:81',
      options: {},
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
