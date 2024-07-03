<script setup>
import { ref } from 'vue';

const props = defineProps({
  items: Array,
  defaultValue: String,
});

const value = ref(
  props.defaultValue ?? props.items[0].value,
);
</script>

<template>
  <div class="tabs">
    <div class="tabs-list">
      <button
        v-for="{ label, value: itemValue } in items"
        type="button"
        :key="itemValue"
        :class="[
          'tabs-list-item',
          itemValue === value && 'tabs-list-item--active',
        ]"
        @click="value = itemValue">
        {{ label }}
      </button>
    </div>

    <div>
      <div
        v-for="{ panel, value: itemValue } in items"
        :key="itemValue"
        :hidden="itemValue !== value">
        {{ panel }}
      </div>
    </div>
  </div>
</template>

<style>
.tabs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tabs-list {
  display: flex;
  gap: 6px;
}

.tabs-list-item {
  --active-color: blueviolet;

  background: none;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 10px;
}

.tabs-list-item:hover {
  border-color: var(--active-color);
  color: var(--active-color);
}

.tabs-list-item--active,
.tabs-list-item--active:hover {
  border-color: var(--active-color);
  background-color: var(--active-color);
  color: #fff;
}
</style>
