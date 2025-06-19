import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { StatusMessagePipe } from './status-message.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    StatusMessagePipe,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
