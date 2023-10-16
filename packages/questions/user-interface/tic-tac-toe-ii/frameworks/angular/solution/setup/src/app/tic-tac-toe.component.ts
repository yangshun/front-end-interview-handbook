import { Component, Input, OnInit } from '@angular/core';

export type Cell = string | null;

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
})
export class TicTacToeComponent implements OnInit {
  @Input()
  n!: number;

  @Input()
  m!: number;

  board: Cell[] = [];
  xIsPlaying = true;
  winner: string | null = null;

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.board = Array(this.n * this.n).fill(null);
    this.xIsPlaying = true;
    this.winner = null;
  }

  clickReset() {
    if (this.winner == null) {
      const confirm = window.confirm(
        'Are you sure you want to reset the game?',
      );
      if (!confirm) {
        return;
      }
    }
    this.resetGame();
  }

  onCellClick(index: number) {
    if (this.board[index] || this.winner) return;
    const turn = this.xIsPlaying ? 'X' : 'O';
    this.board[index] = turn;
    this.winner = this.determineWinner(index);
    this.xIsPlaying = !this.xIsPlaying;
  }

  determineWinner(index: number): string | null {
    const row = Math.floor(index / this.n);
    const col = index % this.n;

    // Get row
    const rowLine = [];
    for (let i = 0; i < this.n; i++) {
      rowLine.push(row * this.n + i);
    }

    // Get column
    const colLine = [];
    for (let i = 0; i < this.n; i++) {
      colLine.push(i * this.n + col);
    }

    const leftToRightDiagonalLine =
      this.getLeftToRightDiagonal(index, this.n);
    const rightToLeftDiagonalLine =
      this.getRightToLeftDiagonal(index, this.n);

    const lines = [
      rowLine,
      colLine,
      leftToRightDiagonalLine,
      rightToLeftDiagonalLine,
    ];

    for (const line of lines) {
      let currentWinner = null;
      let currentCountInARow = 0;
      for (const i of line) {
        if (this.board[i] == null) {
          currentWinner = null;
          currentCountInARow = 0;
          continue;
        }
        if (this.board[i] === currentWinner) {
          currentCountInARow++;
        } else {
          currentWinner = this.board[i];
          currentCountInARow = 1;
        }
        if (currentCountInARow >= this.m) {
          return currentWinner;
        }
      }
    }

    return null;
  }

  getLeftToRightDiagonal(i: number, n: number) {
    const row = Math.floor(i / n);
    const col = i % n;

    const stepsToStart = Math.min(col, row);
    const startRow = row - stepsToStart;
    const startCol = col - stepsToStart;
    const line = [];

    for (let i = 0; i < n; i++) {
      const currentRow = startRow + i;
      const currentCol = startCol + i;
      if (currentRow >= n || currentCol >= n) {
        break;
      }
      line.push(currentRow * n + currentCol);
    }

    return line;
  }

  getRightToLeftDiagonal(i: number, n: number) {
    const row = Math.floor(i / n);
    const col = i % n;

    const stepsToStart = Math.min(n - col - 1, row);
    const startRow = row - stepsToStart;
    const startCol = col + stepsToStart;
    const line = [];

    for (let i = 0; i < n; i++) {
      const currentRow = startRow + i;
      const currentCol = startCol - i;
      if (currentRow >= n || currentCol < 0) {
        break;
      }
      line.push(currentRow * n + currentCol);
    }

    return line;
  }
}
