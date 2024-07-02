/**
 * @param {Document} document
 * @param {string} tagNames
 * @return {Array<Element>}
 */
export default function getElementsByTagNameHierarchy(document, tagNames) {
  const results = [];
  const tagTokens = tagNames.toUpperCase().trim().split(/\s+/);
  const lastIndex = tagTokens.length - 1;

  if (tagTokens.length === 0) {
    return results;
  }

  function traverse(el, tagTokenIndex) {
    if (el == null) {
      return;
    }

    const currentTagToken = tagTokens[tagTokenIndex];
    const elementMatchesCurrentTag = el.tagName === currentTagToken;
    const isLastTag = tagTokenIndex === lastIndex;

    if (elementMatchesCurrentTag && isLastTag) {
      results.push(el);
    }

    const nextIndex = elementMatchesCurrentTag
      ? Math.min(tagTokenIndex + 1, lastIndex) // So as not to increment past the last index.
      : tagTokenIndex;

    for (const child of el.children) {
      traverse(child, nextIndex);
    }
  }

  traverse(document.body, 0);

  return results;
}
