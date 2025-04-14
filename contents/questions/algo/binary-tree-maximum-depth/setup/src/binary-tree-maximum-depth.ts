interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeMaximumDepth(root: TreeNode | null): number {
  // Base case: if the root is null, the depth is 0
  if (root === null) {
    return 0;
  }

  // Recursively compute the depth of the left subtree
  const left_height = binaryTreeMaximumDepth(root.left);

  // Recursively compute the depth of the right subtree
  const right_height = binaryTreeMaximumDepth(root.right);

  // The depth of the current node is 1 (for the current node)
  // plus the maximum depth of the left and right subtrees
  return 1 + Math.max(left_height, right_height);
}
