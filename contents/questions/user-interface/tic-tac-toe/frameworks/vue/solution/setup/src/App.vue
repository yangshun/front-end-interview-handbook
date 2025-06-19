<script setup>
import { computed, ref } from 'vue';
import Cell from './Cell.vue';

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

const board = ref(Array(9).fill(null));
const xIsPlaying = ref(true);

const winner = computed(() => determineWinner(board.value));

const statusMessage = computed(() => {
  if (winner.value != null) {
    return `Player ${winner.value} wins!`;
  }

  // All cells have been filled up.
  if (!board.value.includes(null)) {
    return `It's a draw!`;
  }

  return `Player ${xIsPlaying.value ? 'X' : 'O'} turn`;
});

function reset() {
  if (winner.value == null) {
    // Confirm whether to reset the game.
    const confirm = window.confirm(
      'Are you sure you want to reset the game?',
    );
    if (!confirm) {
      return;
    }
  }

  board.value = Array(9).fill(null);
  xIsPlaying.value = true;
}
</script>

<template>
  <div class="app">
    <div aria-live="polite">{{ statusMessage }}</div>
    <div class="board">
      <Cell
        v-for="(_, index) in 9"
        :key="index"
        :index="index"
        :mark="board[index]"
        :turn="xIsPlaying ? 'X' : 'O'"
        @on-click="
          board[index] = xIsPlaying ? 'X' : 'O';
          xIsPlaying = !xIsPlaying;
        "
        :disabled="
          board[index] != null || winner != null
        " />
    </div>
    <button @click="reset">Reset</button>
  </div>
</template>

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
