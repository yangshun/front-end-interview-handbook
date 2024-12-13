interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeFlip(root: TreeNode | null): TreeNode | null {
  // Base case: if the node is null, return null
  if (root === null) {
    return null;
  }

  // Recursively invert the left and right subtrees
  const right: TreeNode | null = binaryTreeFlip(root.right);
  const left: TreeNode | null = binaryTreeFlip(root.left);

  // Swap the left and right children of the current node
  root.left = right;
  root.right = left;

  // Return the root of the inverted tree
  return root;
}
