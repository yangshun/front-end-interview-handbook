interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Main function to find the maximum path sum in a binary tree
export default function binaryTreeMaximumPathSum(
  root: TreeNode | null,
): number {
  // Initialize maxSum as a very small value (negative infinity)
  let maxSum = -Infinity;

  // Helper function to perform a post-order traversal of the tree
  // and calculate the maximum gain from each subtree
  function gainFromSubtree(node: TreeNode | null): number {
    // Base case: If the node is null, return 0 (no gain)
    if (node === null) {
      return 0;
    }

    // Recursively calculate the maximum gain from the left subtree
    // If the gain is negative, consider it as 0 (ignore it)
    const gainFromLeft = Math.max(gainFromSubtree(node.left), 0);

    // Recursively calculate the maximum gain from the right subtree
    // If the gain is negative, consider it as 0 (ignore it)
    const gainFromRight = Math.max(gainFromSubtree(node.right), 0);

    // Calculate the maximum path sum including the current node
    // and update maxSum if this path has the highest sum so far
    maxSum = Math.max(maxSum, gainFromLeft + gainFromRight + node.val);

    // Return the maximum gain that can be obtained by including the current node
    // and either its left or right subtree (but not both, to keep the path continuous)
    return Math.max(gainFromLeft + node.val, gainFromRight + node.val);
  }

  // Start the traversal from the root node to calculate maxSum
  gainFromSubtree(root);

  // Return the maximum path sum found
  return maxSum;
}
