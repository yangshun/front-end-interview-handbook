<script setup>
import { computed, onMounted, ref } from 'vue';
const COUNT = 200;
const MIN = 1950;
const MAX = 2019;
const BUCKET_SIZE = 10;
const Y_AXIS_SCALE = 10;

// Extract out the fetching of numbers.
async function fetchYearsData() {
  const response = await fetch(
    `https://www.random.org/integers/?num=${COUNT}&min=${MIN}&max=${MAX}&col=1&base=10&format=plain&rnd=new`,
  );

  const numbersString = await response.text();
  return (
    numbersString
      .split('\n')
      .filter(Boolean)
      // Converts strings into numbers.
      .map((number) => +number)
  );
}

// Group array of years into decade buckets.
function groupIntoBuckets(years) {
  const frequency = {};

  years.forEach((year) => {
    const bucket =
      Math.floor(year / BUCKET_SIZE) * BUCKET_SIZE;
    frequency[bucket] ||= 0; // Initialize to 0 if undefined or falsy
    frequency[bucket]++;
  });

  return frequency;
}

const bucketFrequency = ref({});

async function fetchData() {
  const yearsData = await fetchYearsData();
  bucketFrequency.value = groupIntoBuckets(yearsData);
}

onMounted(() => {
  fetchData();
});

const maxBucketFrequency = computed(() =>
  Math.max(0, ...Object.values(bucketFrequency.value)),
);

const maxYAxisValue = computed(() =>
  Math.min(
    Math.ceil(maxBucketFrequency.value / Y_AXIS_SCALE) *
      Y_AXIS_SCALE,
    COUNT,
  ),
);

const bucketLabels = Array.from({
  length: Math.ceil((MAX - MIN) / BUCKET_SIZE),
}).map((_, index) => MIN + index * BUCKET_SIZE);
</script>

<template>
  <div class="wrapper">
    <div class="chart">
      <div class="chart__y-axis">
        <div class="chart__y-axis__items">
          <div
            v-for="value in maxYAxisValue / Y_AXIS_SCALE"
            :key="value"
            class="chart__y-axis__item">
            {{ value * Y_AXIS_SCALE }}
          </div>
        </div>
        <div class="chart__y-axis__zero">0</div>
      </div>
      <div class="chart__main">
        <div class="chart__main__bars">
          <div
            v-for="bucket in bucketLabels"
            :key="bucket"
            class="chart__main__bars__item"
            :style="{
              height: `${
                ((bucketFrequency[bucket] ?? 0) /
                  maxYAxisValue) *
                100
              }%`,
            }" />
        </div>
        <div class="chart__x-axis">
          <div
            v-for="bucket in bucketLabels"
            :key="bucket"
            class="chart__x-axis__item">
            {{ bucket }}
          </div>
        </div>
      </div>
    </div>
    <button @click="fetchData">Refresh</button>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
}

.chart {
  --chart-width: 100%;
  --chart-height: 300px;
  --axis-color: #000;
  --bar-color: rebeccapurple;
  --bars-gap: 16px;

  display: flex;
  max-width: 600px;
  width: var(--chart-width);
  height: var(--chart-height);
}

.chart__y-axis {
  width: 40px;
  display: flex;
  flex-direction: column;
}

.chart__y-axis__items {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  border-right: 1px solid var(--axis-color);
  margin-bottom: 8px;
  align-items: center;
}

.chart__y-axis__item {
  flex-grow: 1;
  transform: translateY(-8px);
}

.chart__y-axis__zero {
  text-align: center;
  transform: translateY(-16px);
}

.chart__main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chart__main__bars {
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  border-bottom: 1px solid var(--axis-color);
  gap: var(--bars-gap);
  padding: 0 var(--bars-gap);
}

.chart__main__bars__item {
  background-color: var(--bar-color);
  flex-grow: 1;
}

.chart__x-axis {
  display: flex;
  gap: var(--bars-gap);
  justify-content: space-around;
  padding: 0 var(--bars-gap);
}

.chart__x-axis__item {
  flex-grow: 1;
  flex-basis: 0%;
  text-align: center;
}
</style>
