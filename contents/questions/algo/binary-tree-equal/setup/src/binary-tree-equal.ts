interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeEqual(
  a: TreeNode | null,
  b: TreeNode | null,
): boolean {
  // Check if both a and b are null
  if (a == null && b == null) {
    return true;
  }

  // If one of a or b is null (but not both), the trees are not the same
  if (b == null || a == null) {
    return false;
  }

  // If the values of the current nodes are different, the trees are not the same
  if (a.val != b.val) {
    return false;
  }

  // Recursively check if the right subtrees are the same and if the left subtrees are the same
  return binaryTreeEqual(a.right, b.right) && binaryTreeEqual(a.left, b.left);
}
