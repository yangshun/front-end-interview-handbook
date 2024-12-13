import binaryTreeRebuildingFromTraversals from './binary-tree-rebuilding-from-traversals';
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

function serializeTree(root: TreeNode | null): (number | null)[] {
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

  // Remove trailing `null` values for a compact serialization
  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

describe('binaryTreeRebuildingFromTraversals', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`preorder = [${example.input[0][1]}] inorder = [${example.input[1][1]}]`, () => {
      expect(
        serializeTree(
          binaryTreeRebuildingFromTraversals(
            example.input[0][1],
            example.input[1][1],
          ),
        ),
      ).toStrictEqual(example.output);
    });
  });
});
