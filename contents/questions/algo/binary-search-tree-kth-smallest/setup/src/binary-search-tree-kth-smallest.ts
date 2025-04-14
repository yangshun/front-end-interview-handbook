interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function inorderTraversal(root: TreeNode | null, arr: number[]): number[] {
  if (root === null) {
    return arr; // Base case: if the node is null, return the current array
  }

  inorderTraversal(root.left, arr); // Recursively traverse the left subtree
  arr.push(root.val); // Add the current node's value to the array
  inorderTraversal(root.right, arr); // Recursively traverse the right subtree

  return arr; // Return the array with collected values
}

export default function kthSmallestElementInABst(
  root: TreeNode | null,
  k: number,
): number {
  // Perform in-order traversal to get a sorted list of node values
  const nums = inorderTraversal(root, []);

  // Return the k-th smallest element (k-1 index due to 0-based indexing)
  return nums[k - 1];
}
