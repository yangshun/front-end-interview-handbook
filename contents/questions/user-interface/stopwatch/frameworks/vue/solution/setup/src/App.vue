<script setup>
import { computed, ref } from 'vue';

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MS_IN_HOUR =
  MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

function formatTime(timeParam) {
  let time = timeParam;
  const parts = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  };
  if (time > MS_IN_HOUR) {
    parts.hours = Math.floor(time / MS_IN_HOUR);
    time %= MS_IN_HOUR;
  }

  if (time > MS_IN_MINUTE) {
    parts.minutes = Math.floor(time / MS_IN_MINUTE);
    time %= MS_IN_MINUTE;
  }

  if (time > MS_IN_SECOND) {
    parts.seconds = Math.floor(time / MS_IN_SECOND);
    time %= MS_IN_SECOND;
  }

  parts.ms = time;

  return parts;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

let lastTickTiming = null;
const totalDuration = ref(0);
const timerId = ref(null);

function startTimer() {
  lastTickTiming = Date.now();
  timerId.value = window.setInterval(() => {
    const now = Date.now();
    const timePassed = now - lastTickTiming;
    totalDuration.value += timePassed;
    lastTickTiming = now;
  }, 1);
}

function stopInterval() {
  window.clearInterval(timerId.value);
  timerId.value = null;
}

function resetTimer() {
  stopInterval();
  totalDuration.value = 0;
}

function toggleTimer() {
  if (isRunning.value) {
    stopInterval();
  } else {
    startTimer();
  }
}

const isRunning = computed(() => {
  return timerId.value != null;
});

const formattedTime = computed(() => {
  return formatTime(totalDuration.value);
});

const formattedMsPartOfTime = computed(() => {
  return padTwoDigit(
    Math.floor(formattedTime.value.ms / 10),
  );
});
</script>

<template>
  <div class="wrapper">
    <div>
      <button class="time" @click="toggleTimer">
        <span v-if="formattedTime.hours > 0">
          <span class="time-number">
            {{ formattedTime.hours }}
          </span>
          <span class="time-unit">h</span>
        </span>
        <span v-if="formattedTime.minutes > 0">
          <span class="time-number">
            {{ formattedTime.minutes }}
          </span>
          <span class="time-unit">m</span>
        </span>
        <span>
          <span class="time-number">
            {{ formattedTime.seconds }}
          </span>
          <span class="time-unit">s</span>
        </span>
        <span class="time-number time-number--small">
          {{ formattedMsPartOfTime }}
        </span>
      </button>
      <div>
        <button @click="toggleTimer">
          {{ isRunning ? 'Stop' : 'Start' }}
        </button>
        <button @click="resetTimer">Reset</button>
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  align-items: center;
  display: flex;
}

.time {
  align-items: baseline;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 16px;
  user-select: none;
}

.time-unit {
  font-size: 24px;
}

.time-number {
  font-size: 62px;
}

.time-number--small {
  font-size: 36px;
}
</style>
