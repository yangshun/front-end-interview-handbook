interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeEqual(
  a: TreeNode | null,
  b: TreeNode | null,
): boolean {
  // Helper function to check if two nodes are the same
  function check(a: TreeNode | null, b: TreeNode | null) {
    // If both nodes are null, they are the same
    if (a === null && b === null) {
      return true;
    }
    // If one node is null and the other is not, they are different
    if (a === null || b === null) {
      return false;
    }
    // If the values of the nodes are different, they are different
    if (a.val !== b.val) {
      return false;
    }
    // If none of the above conditions are met, the nodes are the same
    return true;
  }

  // Initialize a queue with the pair of root nodes
  const queue: [TreeNode | null, TreeNode | null][] = [[a, b]];

  // Process the queue until it is empty
  while (queue.length) {
    // Dequeue the first pair of nodes
    [a, b] = queue.shift() as [TreeNode | null, TreeNode | null];

    // If the nodes are not the same, return false
    if (!check(a, b)) {
      return false;
    }

    // If the current node in a is not null, enqueue its left and right children along with b's corresponding children
    if (a) {
      queue.push([a.left, b?.left] as [TreeNode | null, TreeNode | null]);
      queue.push([a.right, b?.right] as [TreeNode | null, TreeNode | null]);
    }
  }

  // If all nodes are the same, return true
  return true;
}
