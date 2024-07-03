<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  items: Map,
});

// Determine the selected state of the list.
function determineListSelectionState(items) {
  const selectedItems = countSelectedItems(items);
  const totalItems = items.size;

  // Also handles the case where the list is empty.
  if (selectedItems === 0) {
    return 'none';
  }

  if (selectedItems < totalItems) {
    return 'partial';
  }

  return 'all';
}

function countSelectedItems(items) {
  return Array.from(items.values()).filter((val) =>
    Boolean(val),
  ).length;
}

function getChecked(state) {
  switch (state) {
    case 'none':
      return false;
    case 'partial':
      return false;
    case 'all':
      return true;
  }
}

function getIndeterminate(state) {
  switch (state) {
    case 'none':
      return false;
    case 'partial':
      return true;
    case 'all':
      return false;
  }
}

const newItem = ref('');

const listState = computed(() =>
  determineListSelectionState(props.items),
);

const selectedItemsCount = computed(() =>
  countSelectedItems(props.items),
);

const entries = computed(() => Array.from(props.items));
</script>

<template>
  <div class="transfer-list__section">
    <!-- Prevent page reload on form submission. -->
    <form
      @submit.prevent="
        () => {
          // Trim value.
          const newItemValue = newItem.trim();

          // No-op if input is empty.
          if (newItemValue === '') {
            return;
          }

          $emit('add-item', newItem);
          newItem = '';
        }
      ">
      <input type="text" v-model="newItem" />
    </form>

    <hr />

    <div class="transfer-list__section__items__item">
      <label>
        <input
          :disabled="items.size === 0"
          type="checkbox"
          :checked="getChecked(listState)"
          :indeterminate="getIndeterminate(listState)"
          @change="
            () => {
              switch (listState) {
                case 'none':
                case 'partial':
                  $emit('set-all', true);
                  break;
                case 'all':
                  $emit('set-all', false);
                  break;
              }
            }
          " />

        {{
          `${selectedItemsCount} / ${items.size} Selected`
        }}
      </label>
    </div>

    <hr />
    <ul class="transfer-list__section__items">
      <li v-for="[label, checked] in entries">
        <div class="transfer-list__section__items__item">
          <label>
            <input
              type="checkbox"
              :checked="checked"
              @click="$emit('toggle', label)" />
            {{ label }}
          </label>
        </div>
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
