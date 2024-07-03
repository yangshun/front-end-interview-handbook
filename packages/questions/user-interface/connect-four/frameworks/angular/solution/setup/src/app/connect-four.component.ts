import { Component, Input, OnInit } from '@angular/core';

type Player = 'red' | 'yellow';

// Game grid data structure.
type GameGridCellValue = Player | null;
type GameGridType = Array<Array<GameGridCellValue>>;

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
})
export class ConnectFourComponent implements OnInit {
  @Input()
  rows = 6;

  @Input()
  cols = 7;

  @Input()
  countToWin = 4;

  players: Player[] = ['red', 'yellow'];
  currentPlayerIndex = 0;
  winner: Player | null = null;
  currentColumn: number | null = null;
  emptyCell = '#fff';
  playerTokens: Record<Player, string> = {
    red: '#d9313d',
    yellow: '#fdc601',
  };

  // Direction deltas for horizontal, vertical and diagonal
  // directions.
  // The first value is the row delta, second value is the column delta.
  // These will be used to check if there are N consecutive tokens
  // in each direction for winning condition.
  directionDeltas = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, -1], // Diagonal (bottom left to top right)
    [1, 1], // Diagonal (top left to bottom right)
  ];

  grid: GameGridType = Array(this.rows)
    .fill(null)
    .map(() => Array(this.cols).fill(null));

  availableColumns = new Set<number>();

  get gameHasEnded(): boolean {
    return this.isDraw || this.winner != null;
  }

  get isDraw() {
    return (
      this.grid.every((row) =>
        row.every((cell) => cell != null),
      ) && !this.winner
    );
  }

  columns = Array.from(
    { length: this.cols },
    (_, index) => index,
  );

  ngOnInit() {
    this.calculateAvailableColumns();
  }

  calculateAvailableColumns() {
    this.availableColumns.clear();
    for (let i = 0; i < this.cols; i++) {
      if (this.grid[0][i] == null) {
        this.availableColumns.add(i);
      }
    }
  }

  checkIfPlayerWon(
    row: number,
    col: number,
    player: string,
  ): boolean {
    for (let [deltaRow, deltaCol] of this.directionDeltas) {
      let consecutive = 0;
      for (
        let i = -this.countToWin + 1;
        i <= this.countToWin - 1;
        i++
      ) {
        const currRow = row + deltaRow * i;
        const currCol = col + deltaCol * i;
        if (
          currRow >= 0 &&
          currRow < this.rows &&
          currCol >= 0 &&
          currCol < this.cols &&
          this.grid[currRow][currCol] === player
        ) {
          consecutive++;
          if (consecutive >= this.countToWin) {
            return true;
          }
        } else {
          consecutive = 0;
        }
      }
    }
    return false;
  }

  onPlayerMove(col: number) {
    let row = this.rows - 1;
    while (row >= 0 && this.grid[row][col] != null) {
      row--;
    }
    const player = this.players[this.currentPlayerIndex];
    this.grid[row][col] = player;
    if (this.checkIfPlayerWon(row, col, player)) {
      this.winner = player;
    }
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
    this.calculateAvailableColumns();
  }

  onColumnHover(index: number) {
    this.currentColumn = index;
  }

  onRestart() {
    this.grid = Array.from({ length: this.rows }, () =>
      new Array(this.cols).fill(null),
    );
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.currentColumn = null;
    this.calculateAvailableColumns();
  }
}
