import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { LetterGuessState } from '../../models';

@Component({
  selector: 'app-keyboard',
  templateUrl: 'keyboard.component.html',
})
export class KeyboardComponent {
  @Input()
  letterGuessState!: { [char: string]: LetterGuessState };

  @Output()
  keyPressed = new EventEmitter<string>();

  LetterGuessState = LetterGuessState;

  keyboard = Object.freeze([
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [
      'Enter',
      'Z',
      'X',
      'C',
      'V',
      'B',
      'N',
      'M',
      'Backspace',
    ],
  ]);

  onKeyClick(char: string) {
    this.keyPressed.emit(char);
  }
}
