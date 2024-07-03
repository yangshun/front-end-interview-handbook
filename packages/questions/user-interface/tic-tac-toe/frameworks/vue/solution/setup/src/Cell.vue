<script setup>
const props = defineProps({
  index: Number,
  mark: String,
  disabled: Boolean,
  turn: String,
});
</script>

<template>
  <button
    :aria-label="
      props.mark == null
        ? `Mark cell ${props.index} as ${props.turn}`
        : undefined
    "
    class="cell"
    :disabled="props.disabled"
    @click="$emit('on-click')">
    <span aria-hidden>{{ mark }}</span>
  </button>
</template>

<style>
.cell {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #000;
  font-size: min(48px, 10vw);
  font-weight: bold;
  vertical-align: middle;
  aspect-ratio: 1 / 1;
}

.cell:not(:disabled) {
  cursor: pointer;
}

.cell:not(:disabled):hover {
  background-color: #fafafa;
}
</style>
