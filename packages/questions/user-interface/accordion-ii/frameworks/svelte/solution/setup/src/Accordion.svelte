<script context="module">
  let globalAccordionId = 0;
</script>

<script>
  export let sections;
  let openSections = new Set();
  const accordionId = globalAccordionId++;
</script>

<div class="accordion">
  {#each sections as { value, title, contents }}
    {@const isExpanded = openSections.has(value)}
    {@const headerId = `${accordionId}-header-${value}`}
    {@const panelId = `${accordionId}-panel-${value}`}

    <div class="accordion-item">
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        id={headerId}
        class="accordion-item-title"
        on:click={() => {
          if (openSections.has(value)) {
            openSections.delete(value);
          } else {
            openSections.add(value);
          }
          openSections = openSections;
        }}>
        {title}
        <span
          aria-hidden={true}
          class="accordion-icon"
          class:accordion-icon--rotated={isExpanded} />
      </button>
      <div
        aria-labelledby={headerId}
        role="region"
        id={panelId}
        class="accordion-item-contents"
        hidden={!isExpanded}>
        {contents}
      </div>
    </div>
  {/each}
</div>

<style>
  .accordion {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .accordion-item {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    padding: 4px 0;
  }

  .accordion-item:not(:first-child) {
    border-top: 1px solid #eee;
  }

  .accordion-item-title {
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    font-weight: 500;
    padding: 4px;
    justify-content: space-between;
    text-align: start;
    display: flex;
  }

  .accordion-item-title:hover {
    background-color: #eee;
  }

  .accordion-icon {
    border: solid currentcolor;
    border-width: 0 2px 2px 0;
    display: inline-block;
    height: 8px;
    pointer-events: none;
    transform: translateY(-2px) rotate(45deg);
    width: 8px;
  }

  .accordion-icon--rotated {
    transform: translateY(2px) rotate(-135deg);
  }

  .accordion-item-contents {
    font-size: 14px;
    line-height: 1.2em;
    padding: 4px;
  }
</style>
