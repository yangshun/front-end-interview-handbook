<script>
  import GameGrid from './GameGrid.svelte';
  import PlayerMoveSection from './PlayerMoveSection.svelte';
  import WinnerSection from './WinnerSection.svelte';
  import { COLS, ROWS } from './const';
  const COUNT_TO_WIN = 4;
  const PLAYERS = ['red', 'yellow'];

  // Direction deltas for horizontal, vertical and diagonal
  // directions.
  // The first value is the row delta, second value is the column delta.
  // These will be used to check if there are N consecutive tokens
  // in each direction for winning condition.
  const DIRECTION_DELTAS = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, -1], // Diagonal (bottom left to top right)
    [1, 1], // Diagonal (top left to bottom right)
  ];

  // Generate initial game grid.
  function getInitialGrid() {
    return Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null));
  }

  // Check if a player has won.
  function checkIfPlayerWon(grid, row, col, player) {
    return DIRECTION_DELTAS.some(([deltaRow, deltaCol]) => {
      // Count the maximum consecutive discs for the
      // player in the 4 different directions.
      let consecutiveDiscs = 0;
      let maxConsecutiveDiscs = 0;

      for (
        let i = -COUNT_TO_WIN + 1;
        i <= COUNT_TO_WIN - 1;
        i++
      ) {
        const currRow = row + deltaRow * i;
        const currCol = col + deltaCol * i;

        if (grid?.[currRow]?.[currCol] === player) {
          consecutiveDiscs += 1;
          maxConsecutiveDiscs = Math.max(
            consecutiveDiscs,
            maxConsecutiveDiscs,
          );
        } else {
          consecutiveDiscs = 0;
        }
      }

      return maxConsecutiveDiscs >= COUNT_TO_WIN;
    });
  }

  let grid = getInitialGrid();
  let currentPlayerIndex = 0;
  let winner = null;
  let currentColumn = null;

  function handlePlayerMove(column) {
    let rowToPlace = ROWS - 1;
    // Find lowest row in current column that is empty.
    while (grid[rowToPlace][column] != null) {
      rowToPlace--;
    }

    const player = PLAYERS[currentPlayerIndex];
    grid[rowToPlace][column] = player;
    if (
      checkIfPlayerWon(grid, rowToPlace, column, player)
    ) {
      winner = player;
    }

    // Go to the next player.
    currentPlayerIndex =
      (currentPlayerIndex + 1) % PLAYERS.length;
  }

  function handleColumnHover(index) {
    currentColumn = index;
  }

  function restart() {
    grid = getInitialGrid();
    currentColumn = null;
    currentPlayerIndex = 0;
    winner = null;
  }

  $: movesSoFar = grid.reduce(
    (count, row) => count + row.filter(Boolean).length,
    0,
  );
  $: isDraw = movesSoFar === ROWS * COLS && winner == null;
  $: gameHasEnded = isDraw || winner != null;
  $: availableColumns = new Set(
    grid[0]
      .map((piece, index) => (piece == null ? index : -1))
      .filter((item) => item !== -1),
  );
</script>

<div class="app">
  <PlayerMoveSection
    {availableColumns}
    {currentColumn}
    {gameHasEnded}
    currentPlayer={PLAYERS[currentPlayerIndex]}
    on:column-hover={(event) =>
      handleColumnHover(event.detail.index)}
    on:player-move={(event) =>
      handlePlayerMove(event.detail.index)} />

  <GameGrid {grid} />

  <button on:click={restart} class="reset-button">
    Reset
  </button>

  {#if isDraw}
    <h2>DRAW</h2>
  {/if}

  {#if winner != null}
    <WinnerSection {winner} />
  {/if}
</div>

<style>
  .app {
    --grid-item-size: 50px;
    --grid-item-gap: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .reset-button {
    background-color: #ccc;
    border: none;
    padding-block: 8px;
    padding-inline: 16px;
    font-weight: 600;
    border-radius: 16px;
    cursor: pointer;
    margin-block: var(--grid-item-gap);
  }
</style>
