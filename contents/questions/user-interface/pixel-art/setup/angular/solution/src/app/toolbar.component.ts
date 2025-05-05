import {
  Component,
  Input,
  Output,
  EventEmitter,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { COLORS, Color, Mode } from './colors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input()
  selectedColor!: Color;

  @Input()
  mode!: Mode;

  @Output()
  colorChange = new EventEmitter<Color>();

  @Output()
  modeChange = new EventEmitter<Mode>();

  COLORS = COLORS;

  onColorClick(color: string): void {
    this.modeChange.emit('draw');
    this.colorChange.emit(color as Color);
  }
}

@Pipe({ name: 'borderColor' })
export class BorderColorPipe implements PipeTransform {
  transform(
    color: string,
    selectedColor: string,
  ): string | undefined {
    if (color !== selectedColor && color === 'white') {
      return '#ccc';
    }
    if (color === selectedColor && color === 'black') {
      return '#fff';
    }
    return undefined;
  }
}
