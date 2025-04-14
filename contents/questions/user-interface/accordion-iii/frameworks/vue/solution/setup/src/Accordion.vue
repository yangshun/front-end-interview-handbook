<script setup>
import { ref } from 'vue';

function getAccordionHeaderId(accordionId, value) {
  return accordionId + '-header-' + value;
}

function getAccordionPanelId(accordionId, value) {
  return accordionId + '-panel-' + value;
}

const props = defineProps({
  sections: Array,
});

const accordionId = Math.random()
  .toString(36)
  .substring(2, 9);

const openSections = ref(new Set());

function focusOnSection(index) {
  document
    .getElementById(
      getAccordionHeaderId(
        accordionId,
        props.sections[index].value,
      ),
    )
    .focus();
}

function handleKeydown(event) {
  const activeItemValue =
    document.activeElement.getAttribute(
      'data-accordion-value',
    );

  // Only respond to these interactions if
  // an accordion title is in focus.
  if (activeItemValue == null) {
    return;
  }

  switch (event.code) {
    case 'ArrowUp': {
      const index = props.sections.findIndex(
        ({ value: itemValue }) =>
          itemValue === activeItemValue,
      );
      focusOnSection(
        (index - 1 + props.sections.length) %
          props.sections.length,
      );
      break;
    }
    case 'ArrowDown': {
      const index = props.sections.findIndex(
        ({ value: itemValue }) =>
          itemValue === activeItemValue,
      );
      focusOnSection((index + 1) % props.sections.length);
      break;
    }
    case 'Home': {
      focusOnSection(0);
      break;
    }
    case 'End': {
      focusOnSection(props.sections.length - 1);
      break;
    }
    default:
      break;
  }
}
</script>

<template>
  <div class="accordion" @keydown="handleKeydown">
    <div
      class="accordion-item"
      v-for="{ value, title, contents } in sections"
      :key="value">
      <button
        :aria-controls="
          getAccordionPanelId(accordionId, value)
        "
        :aria-expanded="openSections.has(value)"
        :id="getAccordionHeaderId(accordionId, value)"
        class="accordion-item-title"
        type="button"
        :data-accordion-value="value"
        @click="
          () => {
            if (openSections.has(value)) {
              openSections.delete(value);
            } else {
              openSections.add(value);
            }
          }
        ">
        {{ title }}
        <span
          aria-hidden
          :class="[
            'accordion-icon',
            openSections.has(value) &&
              'accordion-icon--rotated',
          ]" />
      </button>

      <div
        :aria-labelledby="
          getAccordionHeaderId(accordionId, value)
        "
        role="region"
        class="accordion-item-contents"
        :id="getAccordionPanelId(accordionId, value)"
        :hidden="!openSections.has(value)">
        {{ contents }}
      </div>
    </div>
  </div>
</template>

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
