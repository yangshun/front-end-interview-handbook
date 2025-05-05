<script>
  import './styles.css';
  import ItemList from './ItemList.svelte';

  const DEFAULT_ITEMS_LEFT = [
    'HTML',
    'JavaScript',
    'CSS',
    'TypeScript',
  ];
  const DEFAULT_ITEMS_RIGHT = [
    'React',
    'Angular',
    'Vue',
    'Svelte',
  ];

  let itemsLeft = generateItemsMap(DEFAULT_ITEMS_LEFT);
  let itemsRight = generateItemsMap(DEFAULT_ITEMS_RIGHT);

  // Transfer selected items from a source list to a destination list.
  function transferSelectedItems(itemsSrc, itemsDst) {
    const newItemsSrc = new Map(itemsSrc);
    const newItemsDst = new Map(itemsDst);

    // Remove selected items from source list and add to the destination list.
    itemsSrc.forEach((value, key) => {
      if (!value) {
        return;
      }

      newItemsDst.set(key, value);
      newItemsSrc.delete(key);
    });
    return [newItemsSrc, newItemsDst];
  }

  // Convert the default array of items into a map with the item
  // name as a key and the value as a boolean.
  function generateItemsMap(items) {
    return new Map(items.map((label) => [label, false]));
  }

  // Determine if the list has no selected items.
  function hasNoSelectedItems(items) {
    return (
      Array.from(items.values()).filter((val) =>
        Boolean(val),
      ).length === 0
    );
  }

  // Transfer all items from a source list to a destination list.
  function transferAllItems(itemsSrc, itemsDst) {
    return [new Map(), new Map([...itemsDst, ...itemsSrc])];
  }
</script>

<div class="transfer-list">
  <ItemList bind:items={itemsLeft} />
  <div class="transfer-list__actions">
    <button
      aria-label="Transfer all items to left list"
      disabled={itemsRight.size === 0}
      on:click={() => {
        [itemsRight, itemsLeft] = transferAllItems(
          itemsRight,
          itemsLeft,
        );
      }}>
      <span aria-hidden={true}>&lt;&lt;</span>
    </button>
    <button
      aria-label="Transfer selected items to left list"
      disabled={hasNoSelectedItems(itemsRight)}
      on:click={() => {
        [itemsRight, itemsLeft] = transferSelectedItems(
          itemsRight,
          itemsLeft,
        );
      }}>
      <span aria-hidden={true}>&lt;</span>
    </button>
    <button
      aria-label="Transfer selected items to right list"
      disabled={hasNoSelectedItems(itemsLeft)}
      on:click={() => {
        [itemsLeft, itemsRight] = transferSelectedItems(
          itemsLeft,
          itemsRight,
        );
      }}>
      <span aria-hidden={true}>&gt;</span>
    </button>
    <button
      aria-label="Transfer all items to right list"
      disabled={itemsLeft.size === 0}
      on:click={() => {
        [itemsLeft, itemsRight] = transferAllItems(
          itemsLeft,
          itemsRight,
        );
      }}>
      <span aria-hidden={true}>&gt;&gt;</span>
    </button>
  </div>
  <ItemList bind:items={itemsRight} />
</div>

<style>
  .transfer-list {
    border: 1px solid #ccc;
    display: flex;
    max-width: 768px;
    margin: 0 auto;
  }

  .transfer-list__actions {
    border-color: #ccc;
    border-width: 0 1px 0 1px;
    border-style: solid;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 20px;
    row-gap: 12px;
  }
</style>
