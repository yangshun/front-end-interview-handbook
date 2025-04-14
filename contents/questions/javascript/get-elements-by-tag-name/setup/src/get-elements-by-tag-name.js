/**
 * @param {Element} element
 * @param {string} tagName
 * @return {Array<Element>}
 */
export default function getElementsByTagName(element, tagNameParam) {
  const elements = [];
  const tagName = tagNameParam.toUpperCase();

  function traverse(el) {
    if (el == null) {
      return;
    }

    if (el.tagName === tagName) {
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
