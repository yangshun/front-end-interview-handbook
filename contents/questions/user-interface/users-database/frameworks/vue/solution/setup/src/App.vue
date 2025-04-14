<script setup>
import { computed, reactive, ref, watch } from 'vue';

const generateId = (() => {
  let id = 0;
  return () => id++;
})();
const selected = ref(null);
const search = ref('');
const first = ref('');
const last = ref('');
const users = reactive([
  { first: 'Hans', last: 'Emil', id: generateId() },
  { first: 'Max', last: 'Mustermann', id: generateId() },
  { first: 'Roman', last: 'Tisch', id: generateId() },
]);

const filteredUsers = computed(() =>
  users.filter(
    (user) =>
      user.first
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      user.last
        .toLowerCase()
        .includes(search.value.toLowerCase()),
  ),
);

watch(selected, (selectedId) => {
  if (selectedId == null) {
    first.value = '';
    last.value = '';
    return;
  }

  const foundUser = users.find(
    ({ id }) => selectedId === id,
  );
  first.value = foundUser.first;
  last.value = foundUser.last;
});

function create() {
  users.push({
    first: first.value,
    last: last.value,
    id: generateId(),
  });
  first.value = '';
  last.value = '';
}

function update() {
  const foundUser = users.find(
    ({ id }) => selected.value === id,
  );
  foundUser.first = first.value;
  foundUser.last = last.value;
}

function del() {
  const index = users.findIndex(
    ({ id }) => selected.value === id,
  );
  users.splice(index, 1);
  cancel();
}

function cancel() {
  selected.value = null;
}

const hasSelectedUser = computed(
  () => selected.value != null,
);

const canCreateUser = computed(() => {
  return (
    !hasSelectedUser.value &&
    first.value.trim() !== '' &&
    last.value.trim() !== ''
  );
});
</script>

<template>
  <div class="app">
    <div>
      <input
        aria-label="Search users"
        v-model="search"
        placeholder="Search" />
    </div>
    <div class="middle-row">
      <select
        class="users-list"
        size="5"
        v-model="selected">
        <option
          v-for="user in filteredUsers"
          :key="user.id"
          :value="user.id">
          {{ user.first }} {{ user.last }}
        </option>
      </select>
      <div class="inputs">
        <label>First Name: <input v-model="first" /></label>
        <label>Last Name: <input v-model="last" /></label>
      </div>
    </div>
    <div class="buttons">
      <button @click="create" :disabled="!canCreateUser">
        Create
      </button>
      <button @click="update" :disabled="!hasSelectedUser">
        Update
      </button>
      <button @click="del" :disabled="!hasSelectedUser">
        Delete
      </button>
      <button @click="cancel" :disabled="!hasSelectedUser">
        Cancel
      </button>
    </div>
  </div>
</template>

<style>
* {
  font-size: inherit;
}

.app {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input {
  display: block;
}

.middle-row {
  display: flex;
  gap: 16px;
}

.users-list {
  width: 14em;
}

.buttons {
  display: flex;
  gap: 4px;
}
</style>
