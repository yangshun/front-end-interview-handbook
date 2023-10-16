import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { GameState } from '../../models';

@Component({
  selector: 'app-game-result',
  templateUrl: 'game-result.component.html',
})
export class GameResultComponent {
  @Input()
  gameState!: GameState;

  @Input()
  wordOfTheDay!: string;

  @Output()
  resetClick = new EventEmitter<void>();

  GameState = GameState;

  reset() {
    this.resetClick.emit();
  }
}
