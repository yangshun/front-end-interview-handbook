<script setup>
import { ref } from 'vue';

const OPERATIONS = {
  '/2': (value) => value / 2,
  '-1': (value) => value - 1,
  '+1': (value) => value + 1,
  x2: (value) => value * 2,
};

const counter = ref(0);
const history = ref([]);
const undoHistory = ref([]);

function reset() {
  counter.value = 0;
  history.value.length = 0;
  undoHistory.value.length = 0;
}

function undo() {
  const [latest, ...earlierHistory] = history.value;
  counter.value = latest.oldCounter;
  undoHistory.value.unshift(latest);
  history.value = earlierHistory;
}

function redo() {
  const [latest, ...earlierUndoHistory] = undoHistory.value;
  counter.value = latest.newCounter;
  undoHistory.value = earlierUndoHistory;
  history.value.unshift(latest);
}

function performOperation(operation) {
  const oldCounter = counter.value;
  const operationFunction = OPERATIONS[operation];
  if (!operationFunction) return;

  counter.value = operationFunction(counter.value);
  history.value.unshift({
    operation,
    oldCounter,
    newCounter: counter.value,
  });
  undoHistory.value.length = 0;
}
</script>

<template>
  <div class="row">
    <button :disabled="history.length === 0" @click="undo">
      Undo
    </button>
    <button
      :disabled="undoHistory.length === 0"
      @click="redo">
      Redo
    </button>
    <button @click="reset">Reset</button>
  </div>
  <hr />
  <div class="row">
    <button @click="() => performOperation('/2')">
      /2
    </button>
    <button @click="() => performOperation('-1')">
      -1
    </button>
    <div class="counter">{{ counter }}</div>
    <button @click="() => performOperation('+1')">
      +1
    </button>
    <button @click="() => performOperation('x2')">
      x2
    </button>
  </div>
  <hr />
  <div class="row">
    <table v-if="history.length > 0">
      <thead>
        <tr>
          <th>Operation</th>
          <th>Old</th>
          <th>New</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in history" :key="index">
          <td>{{ item.operation }}</td>
          <td>{{ item.oldCounter }}</td>
          <td>{{ item.newCounter }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.counter {
  font-size: 24px;
  margin-left: 24px;
  margin-right: 24px;
}
</style>
