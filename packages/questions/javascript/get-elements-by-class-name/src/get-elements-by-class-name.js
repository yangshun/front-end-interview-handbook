function isSubset(a, b) {
  return Array.from(a).every((value) => b.contains(value));
}

/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 */
export default function getElementsByClassName(rootElement, classNames) {
  const elements = [];
  const classNamesSet = new Set(classNames.trim().split(/\s+/));

  function traverse(element) {
    if (element == null) {
      return;
    }

    if (isSubset(classNamesSet, element.classList)) {
      elements.push(element);
    }

    for (let i = 0; i < element.children.length; i++) {
      traverse(element.children[i]);
    }
  }

  for (let i = 0; i < rootElement.children.length; i++) {
    traverse(rootElement.children[i]);
  }

  return elements;
}
