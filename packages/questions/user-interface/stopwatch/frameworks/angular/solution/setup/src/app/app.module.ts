import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PadTwoDigitPipe } from './pad-two-digit.pipe';

@NgModule({
  declarations: [AppComponent, PadTwoDigitPipe],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
