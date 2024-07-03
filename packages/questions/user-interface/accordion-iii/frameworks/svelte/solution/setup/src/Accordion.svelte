<script context="module">
  let globalAccordionId = 0;
</script>

<script>
  export let sections;
  let openSections = new Set();
  const accordionId = globalAccordionId++;
  let sectionHeaders = [];

  function focusOnSection(index) {
    sectionHeaders[index].focus();
  }
</script>

<div
  class="accordion"
  on:keydown={(event) => {
    const activeHeaderIndex = sectionHeaders.indexOf(
      document.activeElement,
    );

    // Only respond to these interactions if
    // an accordion title is in focus.
    if (activeHeaderIndex === -1) {
      return;
    }

    switch (event.code) {
      case 'ArrowUp': {
        focusOnSection(
          (activeHeaderIndex - 1 + sections.length) %
            sections.length,
        );
        break;
      }
      case 'ArrowDown': {
        focusOnSection(
          (activeHeaderIndex + 1) % sections.length,
        );
        break;
      }
      case 'Home': {
        focusOnSection(0);
        break;
      }
      case 'End': {
        focusOnSection(sections.length - 1);
        break;
      }
      default:
        break;
    }
  }}>
  {#each sections as { value, title, contents }, index}
    {@const isExpanded = openSections.has(value)}
    {@const headerId = `${accordionId}-header-${value}`}
    {@const panelId = `${accordionId}-panel-${value}`}

    <div class="accordion-item">
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        id={headerId}
        class="accordion-item-title"
        bind:this={sectionHeaders[index]}
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
