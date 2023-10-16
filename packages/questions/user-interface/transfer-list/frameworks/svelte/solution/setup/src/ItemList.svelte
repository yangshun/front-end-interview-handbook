<script>
  export let items;
</script>

<div class="transfer-list__section">
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
