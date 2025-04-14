import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DigitComponent } from './digit.component';
import { SeparatorComponent } from './separator.component';
import { FloorPipe } from './floor.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SeparatorComponent,
    DigitComponent,
    FloorPipe,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
