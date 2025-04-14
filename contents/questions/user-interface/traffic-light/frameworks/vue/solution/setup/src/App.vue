<script setup>
import TrafficLight from './TrafficLight.vue';

const config = {
  red: {
    backgroundColor: 'red',
    duration: 4000,
    next: 'green',
  },
  yellow: {
    backgroundColor: 'yellow',
    duration: 500,
    next: 'red',
  },
  green: {
    backgroundColor: 'green',
    duration: 3000,
    next: 'yellow',
  },
};
</script>

<template>
  <div class="wrapper">
    <TrafficLight
      :config="config"
      initialColor="green"
      layout="vertical" />
    <TrafficLight
      :config="config"
      layout="horizontal"
      initialColor="green" />
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
</style>
