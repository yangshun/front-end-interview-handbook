/**
 * @param {Element} rootElement
 * @param {string} tagName
 * @return {Array<Element>}
 */
export default function getElementsByTagName(rootElement, tagNameParam) {
  const elements = [];
  const tagName = tagNameParam.toUpperCase();

  function traverse(element) {
    if (element == null) {
      return;
    }

    if (element.tagName === tagName) {
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
