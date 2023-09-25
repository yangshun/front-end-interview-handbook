function isSubset(a: Set<string>, b: DOMTokenList) {
  return Array.from(a).every((value) => b.contains(value));
}

export default function getElementsByClassName(
  element: Element,
  classNames: string,
): Array<Element> {
  const elements: Array<Element> = [];
  const classNamesSet = new Set(classNames.trim().split(/\s+/));

  function traverse(el: Element) {
    if (el == null) {
      return;
    }

    if (isSubset(classNamesSet, el.classList)) {
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
