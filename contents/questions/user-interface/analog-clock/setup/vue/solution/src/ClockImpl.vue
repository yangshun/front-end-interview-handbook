<!-- Separate out into a component that takes the time as a prop,
so as to make it easy to test the rendering for specific times. -->
<script setup>
import { computed } from 'vue';
import Hand from './Hand.vue';
const FULL_ROTATION_DEGREES = 360;

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

const props = defineProps({
  hours: Number,
  minutes: Number,
  seconds: Number,
  size: Number,
});

const angles = computed(() => {
  const secondsPercentage = props.seconds / 60;
  // To have second-level precision in the minute hand angle.
  const minutesPercentage =
    (props.minutes + secondsPercentage) / 60;
  // To have minute-level precision in the hour hand angle.
  const hoursPercentage =
    ((props.hours % 12) + minutesPercentage) / 12;
  return {
    hour: hoursPercentage * FULL_ROTATION_DEGREES,
    minute: minutesPercentage * FULL_ROTATION_DEGREES,
    second: secondsPercentage * FULL_ROTATION_DEGREES,
  };
});

const dateTimeDisplay = computed(() => {
  return `${padTwoDigit(props.hours)}:${padTwoDigit(
    props.minutes,
  )}:${padTwoDigit(props.seconds)}`;
});
</script>

<template>
  <time
    className="clock"
    :dateTime="dateTimeDisplay"
    :style="{
      '--size': `${size}px`,
    }">
    <Hand :height="0.5" :angle="angles.hour" :width="3" />
    <Hand :height="0.9" :angle="angles.minute" :width="2" />
    <Hand :height="0.8" :angle="angles.second" :width="1" />
  </time>
</template>

<style>
.clock {
  display: block;
  flex-shrink: 0;
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 100%;
  border: 2px solid #ccc;
  transform: rotate(180deg);
}
</style>
