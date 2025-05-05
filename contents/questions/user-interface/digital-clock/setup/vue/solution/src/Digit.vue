<script setup>
import { computed } from 'vue';

const ALL_SIDES = [
  'digit-square-border-top',
  'digit-square-border-left',
  'digit-square-border-right',
  'digit-square-border-bottom',
];

const NUMBER_TO_CLASSES = {
  0: {
    top: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-right',
    ],
    bottom: [
      'digit-square-border-bottom',
      'digit-square-border-left',
      'digit-square-border-right',
    ],
  },
  1: {
    top: ['digit-square-border-right'],
    bottom: ['digit-square-border-right'],
  },
  2: {
    top: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-bottom',
    ],
  },
  3: {
    top: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
  },
  4: {
    top: [
      'digit-square-border-left',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-right',
      'digit-square-border-top',
    ],
  },
  5: {
    top: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
  },
  6: {
    top: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-bottom',
    ],
    bottom: ALL_SIDES,
  },
  7: {
    top: [
      'digit-square-border-top',
      'digit-square-border-right',
    ],
    bottom: ['digit-square-border-right'],
  },
  8: {
    top: ALL_SIDES,
    bottom: ALL_SIDES,
  },
  9: {
    top: ALL_SIDES,
    bottom: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
  },
};

const props = defineProps({
  number: Number,
});

const topClasses = computed(
  () => NUMBER_TO_CLASSES[props.number].top,
);
const bottomClasses = computed(
  () => NUMBER_TO_CLASSES[props.number].bottom,
);
</script>

<template>
  <div>
    <div
      :class="[
        'digit-square',
        'digit-square-top',
        ...topClasses,
      ]" />
    <div
      :class="[
        'digit-square',
        'digit-square-bottom',
        ...bottomClasses,
      ]" />
  </div>
</template>

<style>
.digit-square {
  border-style: solid;
  border-color: transparent;
  border-width: var(--segment-width);
  box-sizing: border-box;
  height: var(--segment-size);
  width: var(--segment-size);
}

.digit-square-top {
  border-bottom-width: calc(var(--segment-width) / 2);
}

.digit-square-bottom {
  border-top-width: calc(var(--segment-width) / 2);
}

.digit-square-border-top {
  border-top-color: var(--segment-color);
}

.digit-square-border-left {
  border-left-color: var(--segment-color);
}

.digit-square-border-right {
  border-right-color: var(--segment-color);
}

.digit-square-border-bottom {
  border-bottom-color: var(--segment-color);
}
</style>
