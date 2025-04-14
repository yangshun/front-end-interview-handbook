<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: Map,
});

const entries = computed(() => Array.from(props.items));
</script>

<template>
  <div class="transfer-list__section">
    <ul class="transfer-list__section__items">
      <li v-for="[label, checked] in entries">
        <label>
          <input
            type="checkbox"
            :checked="checked"
            @change="$emit('toggle', label)" />
          {{ label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style>
ul {
  list-style-type: none;
  padding-left: 0;
}

.transfer-list__section {
  padding: 20px;
  flex-grow: 1;
}

.transfer-list__section__items {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.transfer-list__section__items__item {
  display: flex;
  gap: 8px;
}
</style>
