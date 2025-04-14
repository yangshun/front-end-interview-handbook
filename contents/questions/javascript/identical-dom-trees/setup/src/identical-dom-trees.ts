export default function identicalDOMTrees(nodeA: Node, nodeB: Node): boolean {
  if (nodeA.nodeType !== nodeB.nodeType) {
    return false;
  }

  if (nodeA.nodeType === Node.TEXT_NODE) {
    return nodeA.textContent === nodeB.textContent;
  }

  const elA = nodeA as Element;
  const elB = nodeB as Element;

  // We can assume it's an element node from here on.
  if (elA.tagName !== elB.tagName) {
    return false;
  }

  if (elA.childNodes.length !== elB.childNodes.length) {
    return false;
  }

  if (elA.attributes.length !== elB.attributes.length) {
    return false;
  }

  const hasSameAttributes = elA
    .getAttributeNames()
    .every(
      (attrName) => elA.getAttribute(attrName) === elB.getAttribute(attrName),
    );

  if (!hasSameAttributes) {
    return false;
  }

  return Array.prototype.every.call(elA.childNodes, (childA, index) =>
    identicalDOMTrees(childA, elB.childNodes[index]),
  );
}
