class Node<T> {
  value: number | null;
  left: Node<T> | null;
  right: Node<T> | null;

  constructor(value: number | null = null) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class BinarySearchTree<T> {
  root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  /**
   * Inserts a new value into the BST while maintaining BST properties.
   * @param value The value to be inserted into the BST.
   */
  insert(value: number): void {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode: Node<T> | null = this.root;
    let parent: Node<T> | null = null;
    while (currentNode) {
      parent = currentNode;
      if (value < currentNode.value!) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (parent && value < parent.value!) {
      parent.left = newNode;
    } else if (parent) {
      parent.right = newNode;
    }
  }

  /**
   * Searches for a value in the BST. Returns true if the value exists, false otherwise.
   * @param value The value to search for.
   * @return True if the value is found, false otherwise.
   */
  search(value: number): boolean {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return true;
      }
      currentNode =
        value < currentNode.value! ? currentNode.left : currentNode.right;
    }
    return false;
  }

  /**
   * Deletes a value from the BST, if it exists, while maintaining BST properties.
   * @param value The value to be deleted from the BST.
   */
  delete(value: number): void {
    let currentNode = this.root;
    let parent: Node<T> | null = null;

    // Find the node and its parent.
    while (currentNode && currentNode.value !== value) {
      parent = currentNode;
      if (value < currentNode.value!) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (!currentNode) {
      return; // Node not found.
    }

    // Node has two children.
    if (currentNode.left && currentNode.right) {
      let successor = currentNode.right;
      let successorParent = currentNode;

      // Find the node with the smallest value in the right subtree and take note of its parent.
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      currentNode.value = successor.value; // Replace value.
      currentNode = successor; // Move pointer to successor, which will be deleted.
      parent = successorParent;
    }

    // Node has one or zero children.
    let child = currentNode.left ? currentNode.left : currentNode.right;

    // If the node to be deleted is the root node.
    if (!parent) {
      this.root = child;
    } else {
      if (parent.left === currentNode) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
  }
}
