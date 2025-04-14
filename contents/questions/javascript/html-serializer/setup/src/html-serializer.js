/**
 * @param {Object} element
 * @return {string}
 */
export default function serializeHTML(element, indent = '\t') {
  function traverse(element, depth = 0) {
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
