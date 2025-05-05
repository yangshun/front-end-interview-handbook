<script setup>
import { ref } from 'vue';
import Cell from './Cell.vue';

// Make it easy to visualize the board.
// Customize the board rendering just by changing
// this 2D array. Note that all rows have to
// contain the same number of elements in order
// for the grid to render properly.
const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const order = ref([]);
const isDeactivating = ref(false);

// If necessary, disable clicking during deactivation is playing.
function deactivateCells() {
  isDeactivating.value = true;
  const timer = setInterval(() => {
    order.value.pop();

    if (order.value.length === 0) {
      clearInterval(timer);
      isDeactivating.value = false;
    }
  }, 300);
}

function onCellClick(index) {
  order.value.push(index);

  // All the cells have been activated, we can proceed
  // to deactivate them one by one.
  if (
    order.value.length ===
    config.flat(1).filter(Boolean).length
  ) {
    deactivateCells();
  }
}
</script>

<template>
  <div class="wrapper">
    <div
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
      }">
      <template
        v-for="(value, index) in config.flat(1)"
        :key="index">
        <Cell
          v-if="value"
          :key="index"
          :label="`Cell ${index}`"
          :filled="order.includes(index)"
          :isDisabled="
            order.includes(index) || isDeactivating
          "
          @cell-click="onCellClick(index)" />
        <span v-else />
      </template>
    </div>

    <!-- Helper to show the state -->
    <pre>order array: {{ order.join(', ') }}</pre>
  </div>
</template>

<style>
.wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}

.grid {
  --spacing: 20px;
  display: grid;
  max-width: 300px;
  width: 100%;
  padding: var(--spacing);
  gap: var(--spacing);
  border: 1px solid #000;
}
</style>
