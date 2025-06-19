<script>
  import Cell from './Cell.svelte';
  import './styles.css';

  // List of cell indices that are 3-in-a-row.
  const CELLS_IN_A_LINE = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Determine if there's a winner for the board.
  function determineWinner(board) {
    for (let i = 0; i < CELLS_IN_A_LINE.length; i++) {
      const [x, y, z] = CELLS_IN_A_LINE[i];
      // Determine if the cells in a line have the same mark.
      if (
        board[x] != null &&
        board[x] === board[y] &&
        board[y] === board[z]
      ) {
        return board[x];
      }
    }

    // No winner yet.
    return null;
  }

  let board = Array(9).fill(null);
  let xIsPlaying = true;
  $: winner = determineWinner(board);

  function onReset() {
    board = Array(9).fill(null);
    xIsPlaying = true;
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
  <div class="board">
    {#each { length: 9 } as _, cellIndex (cellIndex)}
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
    grid-template-columns: repeat(3, 1fr);
  }
</style>
