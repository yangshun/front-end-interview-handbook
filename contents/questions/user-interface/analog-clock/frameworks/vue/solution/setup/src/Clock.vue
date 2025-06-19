<script setup>
import { computed } from 'vue';
import ClockImpl from './ClockImpl.vue';
import { useCurrentDate } from './composables';

const currentDate = useCurrentDate();

const currentTime = computed(() => {
  const currentDateValue = currentDate.value;
  const hours = currentDateValue.getHours() % 12;
  const minutes = currentDateValue.getMinutes();
  const seconds = currentDateValue.getSeconds();
  return {
    hours,
    minutes,
    seconds,
  };
});
</script>

<template>
  <ClockImpl
    :hours="currentTime.hours"
    :minutes="currentTime.minutes"
    :seconds="currentTime.seconds"
    :size="300" />
</template>
