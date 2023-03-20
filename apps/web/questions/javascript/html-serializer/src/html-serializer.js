/**
 * @param {Node} node
 * @return {string}
 */
export default function serializeNode(obj, indent = '\t') {
  function traverse(node, depth = 0) {
    return node.children
      ? [
          `${indent.repeat(depth)}<${node.tag}>`,
          ...node.children.flatMap((child) => traverse(child, depth + 1)),
          `${indent.repeat(depth)}</${node.tag}>`,
        ]
      : `${indent.repeat(depth)}${node}`;
  }

  return traverse(obj).join('\n');
}
