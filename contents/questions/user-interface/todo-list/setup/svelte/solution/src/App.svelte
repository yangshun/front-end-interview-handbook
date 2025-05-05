<script context="module">
  let id = 0;
  const INITIAL_TASKS = [
    { id: id++, label: 'Walk the dog' },
    { id: id++, label: 'Water the plants' },
    { id: id++, label: 'Wash the dishes' },
  ];
</script>

<script>
  let tasks = INITIAL_TASKS;
  let newTask = '';
</script>

<h1>Todo List</h1>
<div>
  <input
    aria-label="Add new task"
    type="text"
    placeholder="Add your task"
    bind:value={newTask} />
  <div>
    <button
      on:click={() => {
        tasks.push({
          id: id++,
          label: newTask.trim(),
        });
        tasks = tasks;
        newTask = '';
      }}>
      Submit
    </button>
  </div>
</div>
<ul>
  {#each tasks as { id, label } (id)}
    <li>
      <span>{label}</span>
      <button
        on:click={() => {
          const index = tasks.findIndex(
            (task) => task.id === id,
          );
          tasks.splice(index, 1);
          tasks = tasks;
        }}>
        Delete
      </button>
    </li>
  {/each}
</ul>
