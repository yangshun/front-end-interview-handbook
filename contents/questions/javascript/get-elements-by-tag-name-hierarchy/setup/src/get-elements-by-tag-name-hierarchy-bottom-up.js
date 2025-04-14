/**
 * @param {Document} document
 * @param {string} tagNames
 * @return {Array<Element>}
 */
export default function getElementsByTagNameHierarchy(document, tagNames) {
  const tagTokens = tagNames.toUpperCase().trim().split(/\s+/);

  if (tagTokens.length === 0) {
    return [];
  }

  const elements = [];
  const lastTag = tagTokens[tagTokens.length - 1];

  function findTag(el) {
    if (el == null) {
      return;
    }

    if (el.tagName === lastTag) {
      elements.push(el);
    }

    for (const child of el.children) {
      findTag(child);
    }
  }

  findTag(document.body);

  function checkAncestorHierarchy(el) {
    let currentIndex = tagTokens.length - 1;
    let currentEl = el;
    let matchingElements = 0;

    while (
      currentEl != null &&
      currentIndex >= 0 &&
      matchingElements !== tagTokens.length
    ) {
      if (tagTokens[currentIndex] === currentEl.tagName) {
        matchingElements++;
        currentIndex--;
      }

      currentEl = currentEl.parentNode;
    }

    return matchingElements === tagTokens.length;
  }

  // Second step: check each tag's ancestor hierarchy and return the matching ones.
  return elements.filter((el) => checkAncestorHierarchy(el));
}
