export default function getElementsByTagNameHierarchy(
  document: Document,
  tagNames: string,
): Array<Element> {
  const results: Array<Element> = [];
  const tagTokens = tagNames.toUpperCase().trim().split(/\s+/);
  const lastIndex = tagTokens.length - 1;

  if (tagTokens.length === 0) {
    return results;
  }

  function traverse(el: Element, tagTokenIndex: number) {
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
