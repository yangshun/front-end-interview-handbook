import {
  serializeBinaryTree,
  deserializeBinaryTree,
} from './binary-tree-serialization-deserialization';
import runTestCases from './run.tests.json';

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
  serializedTree: (number | null)[],
): TreeNode | null {
  if (serializedTree.length === 0) {
    return null;
  }

  const nodeQueue: TreeNode[] = [];
  let index = 0;

  // Create the root node
  const root = new TreeNode(Number(serializedTree[index]));
  nodeQueue.push(root);
  index++;

  while (nodeQueue.length > 0 && index < serializedTree.length) {
    const currentNode = nodeQueue.shift()!;

    // Process left child
    if (index < serializedTree.length && serializedTree[index] !== null) {
      currentNode.left = new TreeNode(Number(serializedTree[index]));
      nodeQueue.push(currentNode.left);
    }
    index++;

    // Process right child
    if (index < serializedTree.length && serializedTree[index] !== null) {
      currentNode.right = new TreeNode(Number(serializedTree[index]));
      nodeQueue.push(currentNode.right);
    }
    index++;
  }

  return root;
}

function serializeTreeHelper(root: TreeNode | null): (number | null)[] {
  if (!root) {
    return [];
  }

  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing "null" values for a compact serialization
  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

describe('binaryTreeSerializationDeserialization', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = ${example.input[0][1]}`, () => {
      const treeRoot = createTreeFromSerialized(example.input[0][1]);
      const serialized = serializeBinaryTree(treeRoot);
      expect(typeof serialized).toBe('string');

      const treeRoot_ = deserializeBinaryTree(serialized);
      expect(serializeTreeHelper(treeRoot_)).toStrictEqual(example.output);
    });
  });
});
