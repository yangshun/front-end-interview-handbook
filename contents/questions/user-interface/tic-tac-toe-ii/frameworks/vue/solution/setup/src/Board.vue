<script setup>
import { computed, ref, watch } from 'vue';
import Cell from './Cell.vue';

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

const props = defineProps({
  n: Number,
  m: Number,
});

const board = ref(Array(props.n * props.n).fill(null));
const xIsPlaying = ref(true);
const winner = ref(null);

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

  board.value = Array(props.n * props.n).fill(null);
  xIsPlaying.value = true;
  winner.value = null;
}

watch([() => props.m, () => props.n], ([m, n]) => {
  if (m > n) {
    throw Error('Invalid props. `m` must be <= `n`.');
  }

  reset();
});
</script>

<template>
  <div class="app">
    <div aria-live="polite">{{ statusMessage }}</div>
    <div
      class="board"
      :style="{
        'grid-template-columns': `repeat(${n}, 1fr)`,
      }">
      <Cell
        v-for="(_, index) in n * n"
        :key="index"
        :index="index"
        :mark="board[index]"
        :turn="xIsPlaying ? 'X' : 'O'"
        @on-click="
          board[index] = xIsPlaying ? 'X' : 'O';
          xIsPlaying = !xIsPlaying;

          winner = determineWinner(board, index, n, m);
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
}
</style>
