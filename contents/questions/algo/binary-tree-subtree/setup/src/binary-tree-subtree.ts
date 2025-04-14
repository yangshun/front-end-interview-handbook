interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeSubtree(
  root: TreeNode | null,
  subRoot: TreeNode | null,
): boolean {
  // If 'root' is null, it means there is no tree to check against 'subRoot'
  // As per the constraints, 'subRoot' will always be non-null
  if (root === null) {
    return false;
  }

  // Check if the tree rooted at 'root' is identical to the tree rooted at 'subRoot'
  if (isIdentical(root, subRoot)) {
    return true;
  }

  // Recursively check the left and right subtrees of 'root'
  // If either subtree is identical to 'subRoot', return true
  return (
    binaryTreeSubtree(root.left, subRoot) ||
    binaryTreeSubtree(root.right, subRoot)
  );
}

function isIdentical(node1: TreeNode | null, node2: TreeNode | null): boolean {
  // If either of the nodes is null, they are identical only if both are null
  if (node1 === null || node2 === null) {
    return node1 === null && node2 === null;
  }

  // If both nodes are non-null, check:
  // 1. Their values are equal
  // 2. Their left subtrees are identical
  // 3. Their right subtrees are identical
  return (
    node1.val === node2.val &&
    isIdentical(node1.left, node2.left) &&
    isIdentical(node1.right, node2.right)
  );
}
