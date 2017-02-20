import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { JobService } from './job.service';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule
  ],
  declarations: [ AppComponent ],
  providers:    [ JobService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

