import { Component, Input } from '@angular/core';
import { GridState, LetterGuessState } from '../../models';

@Component({
  selector: 'app-letter-grid',
  templateUrl: 'letter-grid.component.html',
})
export class LetterGridComponent {
  @Input()
  gridState!: GridState[][];

  LetterGuessState = LetterGuessState;
}
