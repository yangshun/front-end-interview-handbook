<script>
  export let items;

  let newItem = '';
  $: listState = determineListSelectionState(items);

  function countSelectedItems(items) {
    return Array.from(items.values()).filter((val) =>
      Boolean(val),
    ).length;
  }

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
  function setAllItemsSelectionState(items, newState) {
    const newItems = new Map(items);

    Array.from(newItems.keys()).forEach((key) => {
      newItems.set(key, newState);
    });

    return newItems;
  }
</script>

<div class="transfer-list__section">
  <form
    on:submit={(event) => {
      // Prevent page reload on form submission.
      event.preventDefault();

      // Trim value.
      const newItemValue = newItem.trim();

      // No-op if input is empty.
      if (newItemValue === '') {
        return;
      }

      // Add new item to list.
      const newItems = new Map(items);
      newItems.set(newItem, false);
      items = newItems;
      newItem = '';
    }}>
    <input type="text" bind:value={newItem} />
  </form>
  <hr />
  <div class="transfer-list__section__items__item">
    <label>
      <input
        disabled={items.size === 0}
        type="checkbox"
        checked={getChecked(listState)}
        indeterminate={getIndeterminate(listState)}
        on:change={() => {
          switch (listState) {
            case 'none':
            case 'partial':
              items = setAllItemsSelectionState(
                items,
                true,
              );
              break;
            case 'all':
              items = setAllItemsSelectionState(
                items,
                false,
              );
              break;
          }
        }} />
      {`${countSelectedItems(items)} / ${
        items.size
      } Selected`}
    </label>
  </div>
  <hr />
  <ul class="transfer-list__section__items">
    {#each Array.from(items.entries()) as [label, checked]}
      <li>
        <div class="transfer-list__section__items__item">
          <label>
            <input
              type="checkbox"
              {checked}
              on:change={() => {
                const newItems = new Map(items);
                newItems.set(label, !items.get(label));
                items = newItems;
              }} />
            {label}</label>
        </div>
      </li>
    {/each}
  </ul>
</div>

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
