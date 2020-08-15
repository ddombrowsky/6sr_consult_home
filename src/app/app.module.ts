import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { JobService } from './job.service';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [ AppComponent ],
  providers:    [ JobService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

