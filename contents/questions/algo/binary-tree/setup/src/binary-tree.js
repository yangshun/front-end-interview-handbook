export class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  /**
   * Initialize the Binary Tree.
   * @param {*} value The value of the root node.
   */
  constructor(value) {
    this.root = value == null ? null : new BinaryTreeNode(value);
  }

  /**
   * Get the number of nodes in the tree.
   * @return {number} The number of nodes in the tree.
   */
  size() {
    const sizeHelper = (node) => {
      if (!node) {
        return 0;
      }
      return 1 + sizeHelper(node.left) + sizeHelper(node.right);
    };
    return this.root ? sizeHelper(this.root) : 0;
  }

  /**
   * Get the height of the tree.
   * @return {number} The height of the tree.
   */
  height() {
    const heightHelper = (node) => {
      if (!node) {
        return -1;
      }
      return 1 + Math.max(heightHelper(node.left), heightHelper(node.right));
    };
    return this.root ? heightHelper(this.root) : 0;
  }

  /**
   * Traverse the tree in an in-order fashion.
   * @return {Array<*>} An array of values of the nodes in in-order traversal.
   */
  inOrder() {
    const arr = [];
    const inOrderHelper = (node) => {
      if (node == null) {
        return;
      }

      inOrderHelper(node.left);
      arr.push(node.value);
      inOrderHelper(node.right);
    };
    inOrderHelper(this.root);
    return arr;
  }

  /**
   * Traverse the tree in a pre-order fashion.
   * @return {Array<*>} An array of values of the nodes in pre-order traversal.
   */
  preOrder() {
    const arr = [];
    const preOrderHelper = (node) => {
      if (!node) {
        return;
      }

      arr.push(node.value);
      preOrderHelper(node.left);
      preOrderHelper(node.right);
    };
    preOrderHelper(this.root);
    return arr;
  }

  /**
   * Traverse the tree in a post-order fashion.
   * @return {Array<*>} An array of values of the nodes in post-order traversal.
   */
  postOrder() {
    const arr = [];
    const postOrderHelper = (node) => {
      if (!node) {
        return;
      }

      postOrderHelper(node.left);
      postOrderHelper(node.right);
      arr.push(node.value);
    };
    postOrderHelper(this.root);
    return arr;
  }

  /**
   * Checks if the binary tree is balanced, i.e. depth of the two subtrees of
   * every node never differ by more than 1.
   * @return {boolean}
   */
  isBalanced() {
    const isBalancedHelper = (node) => {
      if (!node) {
        return 0;
      }

      const leftHeight = isBalancedHelper(node.left);
      const rightHeight = isBalancedHelper(node.right);

      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1;
      }

      return 1 + Math.max(leftHeight, rightHeight);
    };
    return isBalancedHelper(this.root) !== -1;
  }

  /**
   * Checks if the binary tree is complete, i.e., all levels are completely filled except possibly the last level,
   * which is filled from left to right.
   * @return {boolean} True if the binary tree is complete, false otherwise.
   */
  isComplete() {
    if (!this.root) return true;

    const queue = [this.root];
    let foundNull = false;

    while (queue.length > 0) {
      const node = queue.shift();

      if (node === null) {
        foundNull = true;
      } else {
        if (foundNull) {
          return false; // Found a non-null node after a null one
        }
        queue.push(node.left);
        queue.push(node.right);
      }
    }

    return true;
  }
}
