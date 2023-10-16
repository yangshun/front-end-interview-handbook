import { Component, OnInit } from '@angular/core';

type Cell = string | null;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  board: Cell[] = Array(9).fill(null);
  xIsPlaying = true;
  CELLS_IN_A_LINE = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  statusMessage!: string;
  winner: string | null = null;

  get turn(): string {
    return this.xIsPlaying ? 'X' : 'O';
  }

  ngOnInit() {
    this.adjustStatusMessage();
  }

  onCellClick(index: number) {
    if (this.board[index] != null || this.winner != null) {
      return;
    }
    this.board[index] = this.turn;
    this.xIsPlaying = !this.xIsPlaying;
    this.winner = this.determineWinner();
    this.adjustStatusMessage();
  }

  onResetClick() {
    if (
      this.winner == null &&
      !window.confirm(
        'Are you sure you want to reset the game?',
      )
    ) {
      return;
    }
    this.board = Array(9).fill(null);
    this.xIsPlaying = true;
  }

  determineWinner() {
    for (let i = 0; i < this.CELLS_IN_A_LINE.length; i++) {
      const [x, y, z] = this.CELLS_IN_A_LINE[i];
      // Determine if the cells in a line have the same mark.
      if (
        this.board[x] != null &&
        this.board[x] === this.board[y] &&
        this.board[y] === this.board[z]
      ) {
        return this.board[x];
      }
    }

    return null;
  }

  adjustStatusMessage() {
    if (this.winner != null) {
      this.statusMessage = `Player ${this.winner} wins!`;
    } else if (!this.board.includes(null)) {
      this.statusMessage = `It's a draw!`;
    } else {
      this.statusMessage = `Player ${
        this.xIsPlaying ? 'X' : 'O'
      } turn`;
    }
  }
}
