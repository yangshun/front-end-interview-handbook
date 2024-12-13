class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export default function kthSmallestElementInABst(
  root: TreeNode | null,
  k: number,
): number {
  // Stack to hold nodes during the in-order traversal
  const stack: TreeNode[] = [];

  while (true) {
    // Traverse to the leftmost node
    while (root !== null) {
      stack.push(root); // Push the current node onto the stack
      root = root.left; // Move to the left child
    }

    // Process the node at the top of the stack
    root = stack.pop()!; // Pop the node from the stack
    if (--k === 0) {
      return root.val; // If k is 0, return the value of the current node
    }

    // Move to the right subtree
    root = root.right;
  }
}
