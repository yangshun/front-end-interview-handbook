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

    for (const child of element.children) {
      traverse(child);
    }
  }

  for (const child of rootElement.children) {
    traverse(child);
  }

  return elements;
}
