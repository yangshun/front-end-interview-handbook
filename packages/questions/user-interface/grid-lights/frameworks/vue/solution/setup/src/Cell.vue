<script setup>
const props = defineProps({
  filled: Boolean,
  label: String,
  isDisabled: Boolean,
});
</script>

<template>
  <button
    :aria-label="props.label"
    type="button"
    :class="['cell', filled && 'cell--activated']"
    @click="$emit('cell-click')"
    :disabled="props.isDisabled" />
</template>

<style>
.cell {
  background-color: transparent;
  border: 1px solid #000;
  height: 0;
  /* Make height and width equal */
  padding-bottom: 100%;
}

.cell--activated {
  background-color: green;
}
</style>
