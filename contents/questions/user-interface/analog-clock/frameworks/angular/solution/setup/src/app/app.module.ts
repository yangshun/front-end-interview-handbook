import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HandComponent } from './hand.component';
import { ClockComponent } from './clock.component';

@NgModule({
  declarations: [
    AppComponent,
    HandComponent,
    ClockComponent,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
