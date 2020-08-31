import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent, REST_URL } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
      { provide: REST_URL, useValue: `https://cloud-app-rest-api.herokuapp.com/api/v2/obtain_products` }],
  bootstrap: [AppComponent]
})
export class AppModule { }
