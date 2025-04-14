/**
 * @param {Element} element
 * @param {string} property
 * @param {string} value
 * @return {Array<Element>}
 */
export default function getElementsByStyle(element, property, value) {
  const elements = [];

  function traverse(el) {
    if (el == null) {
      return;
    }

    const computedStyles = getComputedStyle(el);
    if (computedStyles.getPropertyValue(property) === value) {
      elements.push(el);
    }

    for (const child of el.children) {
      traverse(child);
    }
  }

  for (const child of element.children) {
    traverse(child);
  }

  return elements;
}
