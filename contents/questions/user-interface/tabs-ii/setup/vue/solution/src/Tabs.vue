<script setup>
import { ref } from 'vue';

function getTabListItemId(tabsId, value) {
  return tabsId + '-tab-' + value;
}

function getTabPanelId(tabsId, value) {
  return tabsId + '-tabpanel-' + value;
}

const props = defineProps({
  items: Array,
  defaultValue: String,
});

const tabsId = Math.random().toString(36).substring(2, 9);

const value = ref(
  props.defaultValue ?? props.items[0].value,
);
</script>

<template>
  <div class="tabs">
    <div class="tabs-list" role="tablist">
      <button
        v-for="{ label, value: itemValue } in items"
        :id="getTabListItemId(tabsId, itemValue)"
        :key="itemValue"
        type="button"
        :class="[
          'tabs-list-item',
          itemValue === value && 'tabs-list-item--active',
        ]"
        @click="value = itemValue"
        role="tab"
        :aria-controls="getTabPanelId(tabsId, itemValue)"
        :aria-selected="itemValue === value">
        {{ label }}
      </button>
    </div>

    <div>
      <div
        v-for="{ panel, value: itemValue } in items"
        :key="itemValue"
        :id="getTabPanelId(tabsId, itemValue)"
        :aria-labelledby="
          getTabListItemId(tabsId, itemValue)
        "
        role="tabpanel"
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
