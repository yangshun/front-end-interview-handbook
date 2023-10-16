<script>
  const OPERATIONS = {
    '/2': (value) => value / 2,
    '-1': (value) => value - 1,
    '+1': (value) => value + 1,
    x2: (value) => value * 2,
  };

  let counter = 0;
  let history = [];
  let undoHistory = [];
  function onReset() {
    counter = 0;
    history = [];
    undoHistory = [];
  }

  function undo() {
    const [latest, ...earlierHistory] = history;
    counter = latest.oldCounter;
    undoHistory = [latest, ...undoHistory];
    history = earlierHistory;
  }

  function redo() {
    const [latest, ...earlierUndoHistory] = undoHistory;
    counter = latest.newCounter;
    undoHistory = earlierUndoHistory;
    history = [latest, ...history];
  }

  function performOperation(operation) {
    const oldCounter = counter;
    const operationFunction = OPERATIONS[operation];
    counter = operationFunction
      ? operationFunction(counter)
      : counter;
    history = [
      { operation, oldCounter, newCounter: counter },
      ...history,
    ];
    undoHistory = [];
  }
</script>

<div class="row">
  <button disabled={history.length === 0} on:click={undo}>
    Undo
  </button>
  <button
    disabled={undoHistory.length === 0}
    on:click={redo}>
    Redo
  </button>
  <button on:click={onReset}>Reset</button>
</div>
<hr />
<div class="row">
  <button on:click={() => performOperation('/2')}
    >/2</button>
  <button on:click={() => performOperation('-1')}
    >-1</button>
  <div class="counter">{counter}</div>
  <button on:click={() => performOperation('+1')}
    >+1</button>
  <button on:click={() => performOperation('x2')}
    >x2</button>
</div>
<hr />
<div class="row">
  {#if history.length > 0}
    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Old</th>
          <th>New</th>
        </tr>
      </thead>
      <tbody>
        {#each history as item}
          <tr>
            <td>{item.operation}</td>
            <td>{item.oldCounter}</td>
            <td>{item.newCounter}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

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
