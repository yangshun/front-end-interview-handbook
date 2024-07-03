<script setup>
import { ref } from 'vue';

let id = 0;

const INITIAL_TASKS = [
  { id: id++, label: 'Walk the dog' },
  { id: id++, label: 'Water the plants' },
  { id: id++, label: 'Wash the dishes' },
];

const tasks = ref(INITIAL_TASKS);
const newTask = ref('');

const onSummit = () => {
  tasks.value.push({ id: id++, label: newTask.value });
  newTask.value = '';
};

const onDelete = (task) => {
  tasks.value = tasks.value.filter((t) => t.id !== task.id);
};
</script>

<template>
  <div>
    <h1>Todo List</h1>
    <div>
      <input
        type="text"
        placeholder="Add your task"
        v-model="newTask" />
      <div>
        <button @click="onSummit">Submit</button>
      </div>
    </div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span>{{ task.label }}</span>
        <button @click="onDelete(task)">Delete</button>
      </li>
    </ul>
  </div>
</template>
