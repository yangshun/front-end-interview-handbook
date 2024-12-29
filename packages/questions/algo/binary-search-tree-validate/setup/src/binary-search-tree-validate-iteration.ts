interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binarySearchTreeValidate(
  root: TreeNode | null,
): boolean {
  // Stack to hold nodes during iterative traversal
  const stack: (TreeNode | null | undefined)[] = [];
  // Stack to hold the lower limits for node values
  const lowerLimits: (number | null | undefined)[] = [];
  // Stack to hold the upper limits for node values
  const upperLimits: (number | null | undefined)[] = [];

  function update(
    node: TreeNode | null,
    low?: number | null,
    high?: number | null,
  ) {
    stack.push(node);
    lowerLimits.push(low);
    upperLimits.push(high);
  }

  // Initialize the stack with the root node and null limits
  update(root, null, null);

  // Iterate while there are nodes in the stack
  while (stack.length > 0) {
    // Pop the top node and its corresponding limits
    const node = stack.pop()!;
    const low = lowerLimits.pop();
    const high = upperLimits.pop();

    // If the node is null, continue to the next iteration
    if (node === null) {
      continue;
    }

    const val = node.val;

    // Ensure low and high are defined before comparison
    if (low != null && val <= low) {
      return false; // Invalid if value is less than or equal to the lower limit
    }
    if (high != null && val >= high) {
      return false; // Invalid if value is greater than or equal to the upper limit
    }

    // Push the right child with updated limits
    update(node.right, val, high);

    // Push the left child with updated limits
    update(node.left, low, val);
  }

  // If no violations are found, return true
  return true;
}
