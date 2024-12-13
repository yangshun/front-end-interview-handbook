interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeLevelOrderTraversal(
  root: TreeNode | null,
): number[][] {
  // Initialize an array to hold the values at each level of the tree
  let levels: number[][] = [];

  // Helper function to traverse the tree
  function helper(node: TreeNode, level: number) {
    // If we're visiting a new level for the first time, add an empty array for that level
    if (levels.length === level) {
      levels.push([]);
    }

    // Add the current node's value to the corresponding level array
    levels[level].push(node.val);

    // Recursively traverse the left subtree, if it exists, and increment the level
    if (node.left !== null) {
      helper(node.left, level + 1);
    }

    // Recursively traverse the right subtree, if it exists, and increment the level
    if (node.right !== null) {
      helper(node.right, level + 1);
    }
  }

  // Start the traversal from the root node at level 0
  if (root !== null) {
    helper(root, 0);
  }

  // Return the array of levels, each containing the node values at that level
  return levels;
}
