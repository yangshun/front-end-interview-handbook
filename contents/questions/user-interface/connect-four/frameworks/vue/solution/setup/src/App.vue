<script setup>
import { computed, ref } from 'vue';

import GameGrid from './GameGrid.vue';
import PlayerMoveSection from './PlayerMoveSection.vue';
import WinnerSection from './WinnerSection.vue';

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

const grid = ref(getInitialGrid());
const currentPlayerIndex = ref(0);
const winner = ref(null);
const currentColumn = ref(null);

function handlePlayerMove(column) {
  let rowToPlace = ROWS - 1;
  // Find lowest row in current column that is empty.
  while (grid.value[rowToPlace][column] != null) {
    rowToPlace--;
  }

  const player = PLAYERS[currentPlayerIndex.value];
  grid.value[rowToPlace][column] = player;
  if (
    checkIfPlayerWon(grid.value, rowToPlace, column, player)
  ) {
    winner.value = player;
  }

  // Go to the next player.
  currentPlayerIndex.value =
    (currentPlayerIndex.value + 1) % PLAYERS.length;
}

function handleColumnHover(index) {
  currentColumn.value = index;
}

function restart() {
  grid.value = getInitialGrid();
  currentColumn.value = null;
  currentPlayerIndex.value = 0;
  winner.value = null;
}

const movesSoFar = computed(() =>
  grid.value.reduce(
    (count, row) => count + row.filter(Boolean).length,
    0,
  ),
);

const isDraw = computed(
  () =>
    movesSoFar.value === ROWS * COLS &&
    winner.value == null,
);

const gameHasEnded = computed(
  () => isDraw.value || winner.value != null,
);

const availableColumns = computed(
  () =>
    new Set(
      grid.value[0]
        .map((piece, index) => (piece == null ? index : -1))
        .filter((item) => item !== -1),
    ),
);
</script>

<template>
  <div class="app">
    <PlayerMoveSection
      :availableColumns="availableColumns"
      :currentColumn="currentColumn"
      :gameHasEnded="gameHasEnded"
      :currentPlayer="PLAYERS[currentPlayerIndex]"
      @column-hover="(index) => handleColumnHover(index)"
      @player-move="(index) => handlePlayerMove(index)" />

    <GameGrid :grid="grid" />

    <button @click="restart" class="reset-button">
      Reset
    </button>

    <h2 v-if="isDraw">DRAW</h2>

    <WinnerSection v-if="winner != null" :winner="winner" />
  </div>
</template>

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
