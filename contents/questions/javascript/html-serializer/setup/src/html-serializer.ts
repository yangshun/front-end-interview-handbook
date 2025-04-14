type Element = string | { tag: string; children: Array<string | Element> };

export default function serializeHTML(element: Element, indent = '\t'): string {
  function traverse(element: Element, depth = 0): string {
    if (typeof element === 'string') {
      return `${indent.repeat(depth)}${element}`;
    }

    return [
      `${indent.repeat(depth)}<${element.tag.toLowerCase()}>`,
      ...element.children.flatMap((child) => traverse(child, depth + 1)),
      `${indent.repeat(depth)}</${element.tag.toLowerCase()}>`,
    ].join('\n');
  }

  return traverse(element);
}
