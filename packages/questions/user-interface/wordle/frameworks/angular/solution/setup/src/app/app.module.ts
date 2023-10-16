import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WordleComponent } from './components/wordle/wordle.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { LetterGridComponent } from './components/letter-grid/letter-grid.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WordleComponent,
    KeyboardComponent,
    LetterGridComponent,
    GameResultComponent,
    AppComponent,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
