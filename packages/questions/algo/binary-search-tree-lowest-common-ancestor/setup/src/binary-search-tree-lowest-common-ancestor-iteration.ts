interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function BSTLowestCommonAncestor(
  root: TreeNode | null,
  a: TreeNode,
  b: TreeNode,
): TreeNode | null {
  // Value of a
  const aVal = a.val;

  // Value of b
  const bVal = b.val;

  // Start from the root node of the tree
  let node = root;

  // Traverse the tree
  while (node !== null) {
    // Value of the current ancestor/parent node
    const parentVal = node.val;

    if (aVal > parentVal && bVal > parentVal) {
      // If both a and b are greater than the parent, move to the right subtree
      node = node.right;
    } else if (aVal < parentVal && bVal < parentVal) {
      // If both a and b are lesser than the parent, move to the left subtree
      node = node.left;
    } else {
      // We have found the split point, i.e., the lowest common ancestor (LCA)
      return node;
    }
  }

  // If the LCA is not found, return null (this case is generally not expected in a BST)
  return null;
}
