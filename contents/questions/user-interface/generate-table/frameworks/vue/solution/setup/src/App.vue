<script setup>
import { ref } from 'vue';
import Table from './Table.vue';

const rows = ref();
const columns = ref();

function submitForm(event) {
  // Obtain data from the form.
  const data = new FormData(event.target);
  const rowsValue = data.get('rows');
  rows.value = Number(rowsValue);
  const columnsValue = data.get('columns');
  columns.value = Number(columnsValue);
}
</script>

<template>
  <div class="app">
    <!-- To prevent a page reload. -->
    <form @submit.prevent="submitForm">
      <div>
        <label for="rows">Rows</label>
        <input
          id="rows"
          name="rows"
          type="number"
          min="1"
          :defaultValue="rows" />
      </div>
      <div>
        <label for="columns">Columns</label>
        <input
          id="columns"
          name="columns"
          type="number"
          min="1"
          :defaultValue="columns" />
      </div>
      <button type="submit">Submit</button>
    </form>

    <Table
      v-if="rows && columns"
      :rows="rows"
      :columns="columns" />
  </div>
</template>

<style>
.app {
  align-items: center;
  display: flex;
  font-size: 12px;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label + input {
  margin-left: 8px;
}
</style>
