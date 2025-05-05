import { Component } from '@angular/core';
import { GameConfig } from './game-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  score: number | null = null;
  running = false;
  currLeftTime = 0;
  visible = new Set<number>();
  rows = 3;
  cols = 3;

  gameConfig: GameConfig = {
    rows: this.rows,
    cols: this.cols,
    roundDuration: 15,
    molesAtOnce: 2,
    molesAppearingInterval: 1500,
    totalCount: this.rows * this.cols,
  };

  startGame() {
    this.running = true;
    this.score = 0;
    this.currLeftTime = this.gameConfig.roundDuration;
    this.startTimer();
    this.generateMoles(this.gameConfig);
  }

  whackMole(index: number) {
    if (!this.visible.has(index)) {
      return;
    }
    const newVisible = new Set<number>(this.visible);
    newVisible.delete(index);
    this.visible = newVisible;
    this.score = (this.score ?? 0) + 1;
  }

  private startTimer() {
    const countdownTimerId = setInterval(() => {
      if (this.currLeftTime <= 0) {
        clearInterval(countdownTimerId);
        this.running = false;
        this.currLeftTime = 0;
      } else {
        this.currLeftTime -= 1;
      }
    }, 1000);
  }

  private generateMoles({
    molesAtOnce,
    totalCount,
    molesAppearingInterval,
  }: GameConfig) {
    const moleTimerId = setInterval(() => {
      if (this.running) {
        this.visible = this.generateMolePositions(
          molesAtOnce,
          totalCount,
        );
      } else {
        clearInterval(moleTimerId);
        this.visible = new Set<number>();
      }
    }, molesAppearingInterval);
  }

  private generateMolePositions(
    molesAtOnce: number,
    totalCount: number,
  ) {
    const indices = Array.from({ length: totalCount }).map(
      (_, index) => index,
    );
    this.shuffle(indices);
    const shuffledIndices = indices.slice(0, molesAtOnce);

    return new Set(shuffledIndices);
  }

  private shuffle(array: number[]) {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
