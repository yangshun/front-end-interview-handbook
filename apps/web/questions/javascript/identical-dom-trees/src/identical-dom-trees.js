/**
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @return {boolean}
 */
export default function isSameTree(nodeA, nodeB) {
  if (nodeA.nodeType !== nodeB.nodeType) {
    return false;
  }

  if (nodeA.nodeType === Node.TEXT_NODE) {
    return nodeA.textContent === nodeB.textContent;
  }

  if (nodeA.childNodes.length !== nodeB.childNodes.length) {
    return false;
  }

  if (nodeA.attributes.length !== nodeB.attributes.length) {
    return false;
  }

  const hasSameAttributes = nodeA
    .getAttributeNames()
    .every(
      (attrName) =>
        nodeA.getAttribute(attrName) === nodeB.getAttribute(attrName),
    );
  if (!hasSameAttributes) {
    return false;
  }

  return Array.prototype.every.call(nodeA.childNodes, (childA, index) =>
    isSameTree(childA, nodeB.childNodes[index]),
  );
}
