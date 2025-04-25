export class BinaryTreeNode<T> {
  public value: T;
  public left: BinaryTreeNode<T> | null;
  public right: BinaryTreeNode<T> | null;

  /**
   * Initialize a Binary Tree node.
   * @param {T} value The value of the node.
   */
  constructor(value?: T) {
    throw 'Not implemented!';
  }
}

export class BinaryTree<T> {
  /**
   * Initialize the Binary Tree.
   * @param {T} value The value of the root node.
   */
  constructor(value?: T) {
    throw 'Not implemented!';
  }

  /**
   * Get the number of nodes in the tree.
   * @return {number} The number of nodes in the tree.
   */
  size(): number {
    throw 'Not implemented!';
  }

  /**
   * Get the height of the tree.
   * @return {number} The height of the tree.
   */
  height(): number {
    throw 'Not implemented!';
  }

  /**
   * Traverse the tree in an in-order fashion.
   * @return {Array<T>} An array of values of the nodes in in-order traversal.
   */
  inOrder(): Array<T> {
    throw 'Not implemented!';
  }

  /**
   * Traverse the tree in a pre-order fashion.
   * @return {Array<T>} An array of values of the nodes in pre-order traversal.
   */
  preOrder(): Array<T> {
    throw 'Not implemented!';
  }

  /**
   * Traverse the tree in a post-order fashion.
   * @return {Array<T>} An array of values of the nodes in post-order traversal.
   */
  postOrder(): Array<T> {
    throw 'Not implemented!';
  }

  /**
   * Checks if the binary tree is balanced, i.e. depth of the two subtrees of
   * every node never differ by more than 1.
   * @return {boolean}
   */
  isBalanced(): boolean {
    throw 'Not implemented!';
  }

  /**
   * Checks if the binary tree is complete, i.e., all levels are completely filled except possibly the last level,
   * which is filled from left to right.
   * @return {boolean} True if the binary tree is complete, false otherwise.
   */
  isComplete(): boolean {
    throw 'Not implemented!';
  }
}
