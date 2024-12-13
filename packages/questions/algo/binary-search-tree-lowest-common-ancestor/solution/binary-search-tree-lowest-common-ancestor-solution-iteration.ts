class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export default function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  // Value of p
  const pVal = p.val;

  // Value of q
  const qVal = q.val;

  // Start from the root node of the tree
  let node = root;

  // Traverse the tree
  while (node !== null) {
    // Value of the current ancestor/parent node
    const parentVal = node.val;

    if (pVal > parentVal && qVal > parentVal) {
      // If both p and q are greater than the parent, move to the right subtree
      node = node.right;
    } else if (pVal < parentVal && qVal < parentVal) {
      // If both p and q are lesser than the parent, move to the left subtree
      node = node.left;
    } else {
      // We have found the split point, i.e., the lowest common ancestor (LCA)
      return node;
    }
  }

  // If the LCA is not found, return null (this case is generally not expected in a BST)
  return null;
}
