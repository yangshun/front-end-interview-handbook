import { Component } from '@angular/core';
import { Color, Mode } from './colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  color: Color = 'black';
  mode: Mode = 'draw';

  onColorChange(color: Color) {
    this.color = color;
  }

  onModeChange(mode: Mode) {
    this.mode = mode;
  }
}
