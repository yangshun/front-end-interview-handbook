interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function BSTLowestCommonAncestor(
  root: TreeNode | null,
  a: TreeNode | null,
  b: TreeNode | null,
): TreeNode | null {
  if (root === null) {
    return null; // Base case: if the root is null, there's no ancestor
  }

  // Value of the current node (parent node)
  const parentVal = root.val;

  // Value of node a
  const aVal = a!.val;

  // Value of node b
  const bVal = b!.val;

  // If both a and b are bigger than parent, explore the right subtree
  if (aVal > parentVal && bVal > parentVal) {
    return BSTLowestCommonAncestor(root.right, a, b);
  }

  // If both a and b are smaller than parent, explore the left subtree
  if (aVal < parentVal && bVal < parentVal) {
    return BSTLowestCommonAncestor(root.left, a, b);
  }

  // If one of a or b is on one side and the other is on the opposite side,
  // the current node is the lowest common ancestor.
  return root;
}
