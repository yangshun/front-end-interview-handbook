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

export default function binaryTreeLevelOrderTraversal(
  root: TreeNode | null,
): number[][] {
  // Initialize an array to store levels of the tree
  let levels: number[][] = [];

  // If the root is null, return the empty levels array
  if (!root) {
    return levels;
  }

  // Initialize a queue with the root node
  let queue: TreeNode[] = [root];

  // Initialize the level counter
  let level: number = 0;

  // Iterate while there are nodes in the queue
  while (queue.length) {
    // Start the current level by adding an empty array
    levels.push([]);

    // Number of nodes in the current level
    let levelCount: number = queue.length;

    // Process all nodes at the current level
    for (let i = 0; i < levelCount; i++) {
      // Dequeue the first node in the queue
      let node: TreeNode | undefined = queue.shift();

      // Add the node's value to the current level
      if (node) {
        levels[level].push(node.val);
      }

      // Add the node's children to the queue for the next level
      if (node?.left) {
        queue.push(node.left);
      }
      if (node?.right) {
        queue.push(node.right);
      }
    }

    // Move on to the next level
    level++;
  }

  // Return the array of levels
  return levels;
}
