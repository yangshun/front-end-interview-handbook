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

export default function binaryTreeRebuildingFromTraversals(
  preorder: number[],
  inorder: number[],
): TreeNode | null {
  let preorderIndex = 0;

  // Create a map to store the index of each value in the inorder array for quick lookup
  let inorderIndexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderIndexMap.set(inorder[i], i);
  }

  // Helper function to recursively build the tree
  function arrayToTree(left: number, right: number): TreeNode | null {
    // Base case: if there are no elements to construct the tree
    if (left > right) {
      return null;
    }

    // Select the current element from preorder as the root and increment the index
    let rootValue = preorder[preorderIndex++];
    let root = new TreeNode(rootValue);

    // Build the left subtree using elements to the left of the root in the inorder array
    root.left = arrayToTree(left, inorderIndexMap.get(rootValue)! - 1);

    // Build the right subtree using elements to the right of the root in the inorder array
    root.right = arrayToTree(inorderIndexMap.get(rootValue)! + 1, right);

    // Return the constructed subtree rooted at this node
    return root;
  }

  // Start constructing the tree from the full range of the inorder array
  return arrayToTree(0, preorder.length - 1);
}
