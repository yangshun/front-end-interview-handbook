<script setup>
import { onUnmounted, ref, watchEffect } from 'vue';
const props = defineProps({
  initialColor: String,
  config: Object,
  layout: String,
});

let timerId;
const currentColor = ref(props.initialColor);

function setTimer(color) {
  const { duration, next } = props.config[color];
  timerId = setTimeout(() => {
    currentColor.value = next;
  }, duration);
}

watchEffect(() => {
  setTimer(currentColor.value);
});

onUnmounted(() => {
  clearTimeout(timerId);
});
</script>

<template>
  <div
    aria-live="polite"
    :aria-label="`Current light: ${currentColor}`"
    :class="[
      'traffic-light-container',
      props.layout === 'vertical' &&
        'traffic-light-container--vertical',
    ]">
    <div
      v-for="color in Object.keys(config)"
      :key="color"
      aria-hidden
      class="traffic-light"
      :style="{
        'background-color':
          color === currentColor
            ? props.config[color].backgroundColor
            : undefined,
      }" />
  </div>
</template>

<style>
.traffic-light-container {
  background-color: #000;
  border-radius: 8px;
  display: flex;
  padding: 8px;
  gap: 8px;
  width: fit-content;
}

.traffic-light-container--vertical {
  flex-direction: column;
}

.traffic-light {
  --size: 50px;
  background-color: #555;
  border-radius: var(--size);
  height: var(--size);
  width: var(--size);
}
</style>
