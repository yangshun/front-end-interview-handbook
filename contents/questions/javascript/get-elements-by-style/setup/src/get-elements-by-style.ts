export default function getElementsByStyle(
  element: Element,
  property: string,
  value: string,
): Array<Element> {
  const elements: Array<Element> = [];

  function traverse(el: Element) {
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
