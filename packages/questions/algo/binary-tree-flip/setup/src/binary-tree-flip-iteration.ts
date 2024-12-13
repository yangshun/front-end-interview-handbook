interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeFlip(root: TreeNode | null): TreeNode | null {
  // Base case: if the root is null, return null
  if (root === null) {
    return null;
  }

  // Initialize a queue and add the root node
  const queue: (TreeNode | null)[] = [];
  queue.push(root);

  // Iterate while there are nodes in the queue
  while (queue.length > 0) {
    // Dequeue the current node
    const current = queue.shift();

    if (current !== undefined && current !== null) {
      // Swap the left and right children
      const temp = current.left;
      current.left = current.right;
      current.right = temp;

      // If the left child exists, add it to the queue
      if (current.left !== null) {
        queue.push(current.left);
      }

      // If the right child exists, add it to the queue
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  // Return the root of the inverted tree
  return root;
}
