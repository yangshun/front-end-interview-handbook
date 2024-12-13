interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeMaximumDepth(root: TreeNode | null): number {
  // If the root is null, the depth is 0
  if (root == null) {
    return 0;
  }

  // Initialize a stack for iterative traversal.
  // The stack holds tuples of (TreeNode, current_depth)
  let stack: [TreeNode | null, number][] = [];

  // Start with the root node at depth 1
  stack.push([root, 1]);

  // Variable to keep track of the maximum depth encountered
  let depth = 0;

  // Iterate while there are nodes in the stack
  while (stack.length !== 0) {
    // Pop a node and its associated depth from the stack
    let [node, current_depth] = stack.pop() as [TreeNode, number];

    // If the node is not null, process it
    if (node != null) {
      // Update the maximum depth if the current depth is greater
      depth = Math.max(depth, current_depth);

      // Push left child and right child into the stack with updated depth
      stack.push([node.left, current_depth + 1]);
      stack.push([node.right, current_depth + 1]);
    }
  }

  // Return the maximum depth found
  return depth;
}
