<script>
  import Cell from './Cell.svelte';
  import './styles.css';

  export let n = 5;
  export let m = 4;

  let board = Array(n * n).fill(null);
  let xIsPlaying = true;
  let winner = null;

  $: if (m > n) {
    throw Error('Invalid props. `m` must be <= `n`.');
  }
  $: n, m, onReset();

  // Determine if there's a winner for the board.

  function determineWinner(board, i, n, m) {
    const row = Math.floor(i / n);
    const col = i % n;

    // Get row
    const rowLine = [];
    for (let i = 0; i < n; i++) {
      rowLine.push(row * n + i);
    }

    // Get column
    const colLine = [];
    for (let i = 0; i < n; i++) {
      colLine.push(i * n + col);
    }

    const leftToRightDiagonalLine = getLeftToRightDiagonal(
      i,
      n,
    );
    const rightToLeftDiagonalLine = getRightToLeftDiagonal(
      i,
      n,
    );

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
        if (board[i] == null) {
          currentWinner = null;
          currentCountInARow = 0;
          continue;
        }
        if (board[i] === currentWinner) {
          currentCountInARow++;
        } else {
          currentWinner = board[i];
          currentCountInARow = 1;
        }
        if (currentCountInARow >= m) {
          return currentWinner;
        }
      }
    }

    return null;
  }

  function getLeftToRightDiagonal(i, n) {
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

  function getRightToLeftDiagonal(i, n) {
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

  function onReset() {
    board = Array(n * n).fill(null);
    xIsPlaying = true;
    winner = null;
  }

  function getStatusMessage(winner, board, xIsPlaying) {
    if (winner != null) {
      return `Player ${winner} wins!`;
    }

    // All cells have been filled up.
    if (!board.includes(null)) {
      return `It's a draw!`;
    }

    return `Player ${xIsPlaying ? 'X' : 'O'} turn`;
  }
</script>

<div class="app">
  <div aria-live="polite">
    {getStatusMessage(winner, board, xIsPlaying)}
  </div>
  <div
    class="board"
    style="grid-template-columns: repeat({n}, 1fr);">
    {#each { length: n * n } as _, cellIndex (cellIndex)}
      {@const turn = xIsPlaying ? 'X' : 'O'}
      <Cell
        disabled={board[cellIndex] != null ||
          winner != null}
        index={cellIndex}
        mark={board[cellIndex]}
        {turn}
        on:click={() => {
          const newBoard = board.slice();
          newBoard[cellIndex] = turn;
          board = newBoard;
          xIsPlaying = !xIsPlaying;
          winner = determineWinner(
            newBoard,
            cellIndex,
            n,
            m,
          );
        }} />
    {/each}
  </div>
  <button
    on:click={() => {
      if (winner == null) {
        // Confirm whether to reset the game.
        const confirm = window.confirm(
          'Are you sure you want to reset the game?',
        );
        if (!confirm) {
          return;
        }
      }

      onReset();
    }}>
    Reset
  </button>
</div>

<style>
  .app {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 320px;
    margin: 0 auto;
    row-gap: 16px;
  }

  .board {
    display: grid;
    width: 100%;
  }
</style>
