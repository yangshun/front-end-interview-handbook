import lowestCommonAncestorOfABinarySearchTree from './binary-search-tree-lowest-common-ancestor';
import submitTestCases from './submit.tests.json';

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

function createTreeFromSerialized(
  serializedTree: (string | null)[],
): TreeNode | null {
  if (serializedTree.length === 0) return null;

  const nodeQueue: TreeNode[] = [];
  let index = 0;

  // Create the root node
  const root = new TreeNode(Number(serializedTree[index]));
  nodeQueue.push(root);
  index++;

  while (nodeQueue.length > 0 && index < serializedTree.length) {
    const node = nodeQueue.shift()!; // `!` asserts that `shift` does not return `null`

    // Process left child
    if (index < serializedTree.length && serializedTree[index] != null) {
      node.left = new TreeNode(Number(serializedTree[index]));
      nodeQueue.push(node.left);
    }
    index++;

    // Process right child
    if (index < serializedTree.length && serializedTree[index] != null) {
      node.right = new TreeNode(Number(serializedTree[index]));
      nodeQueue.push(node.right);
    }
    index++;
  }

  return root;
}

function findNode(root: TreeNode | null, num: number): TreeNode | null {
  // Traverse the tree until the node is found or the tree ends (root becomes null)
  while (root != null) {
    // If the current node's value is equal to num, return the node
    if (root.val === num) {
      return root;
    }
    // If num is less than the current node's value, search in the left subtree
    else if (num < root.val) {
      root = root.left;
    }
    // If num is greater than the current node's value, search in the right subtree
    else {
      root = root.right;
    }
  }

  // If the node with value num is not found, return null
  return null;
}

describe('lowestCommonAncestor', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}] ${example.input[1][0]} = ${example.input[1][1]} ${example.input[2][0]} = ${example.input[2][1]}`, () => {
      const root = createTreeFromSerialized(example.input[0][1]);
      const aNode = findNode(root, example.input[1][1]);
      const bNode = findNode(root, example.input[2][1]);
      expect(
        lowestCommonAncestorOfABinarySearchTree(root, aNode, bNode)!.val,
      ).toStrictEqual(example.output);
    });
  });
});
