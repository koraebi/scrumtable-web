import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from "ngx-pagination";
import {SocketIoModule} from "ngx-socket-io";
import {SocketService} from "./core/services/socket.service";
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
