<script setup>
const props = defineProps({
  rows: Number,
  columns: Number,
});
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(_, row) in rows" :key="row">
        <td v-for="(_, col) in columns" :key="col">
          {{
            col % 2 === 0
              ? rows * col + (row + 1)
              : rows * (col + 1) - row
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
table {
  border-collapse: collapse;
}

table td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}
</style>
