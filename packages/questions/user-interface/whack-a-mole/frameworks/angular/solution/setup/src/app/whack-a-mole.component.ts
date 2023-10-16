import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { GameConfig } from './game-config.model';

@Component({
  selector: 'app-whack-a-mole',
  templateUrl: './whack-a-mole.component.html',
})
export class WhackAMoleComponent implements OnInit {
  @Input()
  gameConfig!: GameConfig;

  @Input()
  visible!: Set<number>;

  @Input()
  score!: number | null;

  @Input()
  running!: boolean;

  @Input()
  timeLeft!: number;

  @Output()
  startGame: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  whackMole: EventEmitter<number> =
    new EventEmitter<number>();

  indexes!: number[];

  ngOnInit() {
    this.indexes = [
      ...Array(this.gameConfig.totalCount).keys(),
    ];
  }
}
