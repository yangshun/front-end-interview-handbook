<script>
  import './styles.css';
  import Table from './Table.svelte';

  let rows = 0;
  let columns = 0;
</script>

<div class="app">
  <form
    on:submit={(event) => {
      // To prevent a page reload.
      event.preventDefault();

      // Obtain data from the form.
      const data = new FormData(event.target);
      rows = Number(data.get('rows'));
      columns = Number(data.get('columns'));
    }}>
    <div>
      <label for="rows">Rows</label>
      <input
        id="rows"
        name="rows"
        type="number"
        min={1}
        defaultValue={rows} />
    </div>
    <div>
      <label for="columns">Columns</label>
      <input
        id="columns"
        name="columns"
        type="number"
        min={1}
        defaultValue={columns} />
    </div>
    <button type="submit">Submit</button>
  </form>
  {#if rows > 0 && columns > 0}
    <Table {rows} {columns} />
  {/if}
</div>

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
