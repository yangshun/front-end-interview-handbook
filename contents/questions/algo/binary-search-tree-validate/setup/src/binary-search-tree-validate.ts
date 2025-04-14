interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binarySearchTreeValidate(
  root: TreeNode | null,
): boolean {
  // Helper function to recursively check each node within the allowed range
  function checkNodeInRange(
    node: TreeNode | null,
    minAllowed: number,
    maxAllowed: number,
  ): boolean {
    // Base case: an empty node is a valid BST
    if (node == null) {
      return true;
    }

    // The current node's value must lie between minAllowed and maxAllowed
    if (node.val <= minAllowed || node.val >= maxAllowed) {
      return false;
    }

    // Recursively check the left and right subtrees with updated ranges
    const isLeftValid = checkNodeInRange(node.left, minAllowed, node.val);
    const isRightValid = checkNodeInRange(node.right, node.val, maxAllowed);

    // Both left and right subtrees must be valid
    return isLeftValid && isRightValid;
  }

  // Initial call with the entire range of valid values for a 32-bit signed integer
  return checkNodeInRange(root, -Infinity, Infinity);
}
