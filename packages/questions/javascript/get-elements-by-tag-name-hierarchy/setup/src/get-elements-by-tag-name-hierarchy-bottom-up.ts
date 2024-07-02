export default function getElementsByTagNameHierarchy(
  document: Document,
  tagNames: string,
): Array<Element> {
  const tagTokens = tagNames.toUpperCase().trim().split(/\s+/);

  if (tagTokens.length === 0) {
    return [];
  }

  const elements: Array<Element> = [];
  const lastTag = tagTokens[tagTokens.length - 1];

  function findMatchingTags(el: Element) {
    if (el == null) {
      return;
    }

    if (el.tagName === lastTag) {
      elements.push(el);
    }

    for (const child of el.children) {
      findMatchingTags(child);
    }
  }

  // First step: find all the elements matching the last tag.
  findMatchingTags(document.body);

  function checkAncestorHierarchy(el: Element) {
    let currentIndex = tagTokens.length - 1;
    let currentEl: Node | null = el;
    let matchingElements = 0;

    while (
      currentEl != null &&
      currentIndex >= 0 &&
      matchingElements !== tagTokens.length
    ) {
      if (
        currentEl instanceof Element &&
        tagTokens[currentIndex] === currentEl.tagName
      ) {
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
