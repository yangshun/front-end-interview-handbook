<script setup>
const DICE_FACE_DOT_POSITIONS = {
  1: ['dot--center'],
  2: ['dot--top-right', 'dot--bottom-left'],
  3: ['dot--top-right', 'dot--center', 'dot--bottom-left'],
  4: [
    'dot--top-left',
    'dot--top-right',
    'dot--bottom-left',
    'dot--bottom-right',
  ],
  5: [
    'dot--top-left',
    'dot--top-right',
    'dot--center',
    'dot--bottom-left',
    'dot--bottom-right',
  ],
  6: [
    'dot--top-left',
    'dot--top-right',
    'dot--center-left',
    'dot--center-right',
    'dot--bottom-left',
    'dot--bottom-right',
  ],
};

const props = defineProps({
  value: Number,
});
</script>

<template>
  <div class="dice">
    <div class="dots">
      <div
        v-for="dotPosition in DICE_FACE_DOT_POSITIONS[
          props.value
        ]"
        :class="['dot', dotPosition]" />
    </div>
  </div>
</template>

<style>
.dice {
  --dice-size: 64px;

  width: var(--dice-size);
  height: var(--dice-size);

  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 8px;
}

.dots {
  position: relative;
  height: 100%;
}

.dot {
  --dot-size: 12px;

  position: absolute;
  width: var(--dot-size);
  height: var(--dot-size);
  background-color: #000;
  border-radius: 100%;
}

.dot--center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dot--top-left {
  top: 0;
  left: 0;
}

.dot--top-right {
  top: 0;
  right: 0;
}

.dot--bottom-left {
  bottom: 0;
  left: 0;
}

.dot--bottom-right {
  bottom: 0;
  right: 0;
}

.dot--center-left {
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}

.dot--center-right {
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
</style>
