<script setup>
import { computed } from 'vue';
import Digit from './Digit.vue';
import Separator from './Separator.vue';
import { useCurrentDate } from './composables';

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

const currentDate = useCurrentDate();

const currentTime = computed(() => {
  const currentDateValue = currentDate.value;
  let hours = currentDateValue.getHours() % 12;
  hours = hours === 0 ? 12 : hours;
  const minutes = currentDateValue.getMinutes();
  const seconds = currentDateValue.getSeconds();
  return {
    hours,
    minutes,
    seconds,
  };
});

const dateTimeDisplay = computed(() => {
  const { minutes, seconds } = currentTime.value;
  return `${padTwoDigit(
    currentDate.value.getHours(),
  )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;
});
</script>

<template>
  <!-- Use a <time> element with `datetime` attribute set
   to the current time in 24-hour format so that
   screen readers can read this component. -->
  <time class="clock" :dateTime="dateTimeDisplay">
    <Digit :number="parseInt(currentTime.hours / 10, 10)" />
    <Digit :number="currentTime.hours % 10" />
    <Separator />
    <Digit
      :number="parseInt(currentTime.minutes / 10, 10)" />
    <Digit :number="currentTime.minutes % 10" />
    <Separator />
    <Digit
      :number="parseInt(currentTime.seconds / 10, 10)" />
    <Digit :number="currentTime.seconds % 10" />
  </time>
</template>

<style>
.clock {
  --segment-width: 10px;
  --segment-size: 40px;
  --segment-color: #fff;

  background-color: #000;
  border: 10px solid #ccc;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  padding: 20px;
}
</style>
