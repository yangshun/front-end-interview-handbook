import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MemoryGameComponent } from './memory-game.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, MemoryGameComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
