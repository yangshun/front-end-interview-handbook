import { BinaryTree, BinaryTreeNode } from './binary-tree';

function createTree() {
  const tree = new BinaryTree('F');
  const root = tree.root!;
  root.left = new BinaryTreeNode('B');
  root.left.left = new BinaryTreeNode('A');
  root.left.right = new BinaryTreeNode('D');
  root.left.right.left = new BinaryTreeNode('C');
  root.left.right.right = new BinaryTreeNode('E');
  root.right = new BinaryTreeNode('G');
  root.right.right = new BinaryTreeNode('I');
  root.right.right.left = new BinaryTreeNode('H');
  return tree;
}

describe('BinaryTree', () => {
  describe('constructor()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree).toBeTruthy();
      expect(tree.root).toBe(null);
    });

    test('one-node tree', () => {
      const { root } = new BinaryTree(5);
      expect(root?.value).toBe(5);
    });
  });

  describe('root', () => {
    test('empty tree', () => {
      const { root } = new BinaryTree();
      expect(root).toBe(null);
    });

    test('one-node tree', () => {
      const { root } = new BinaryTree(5);
      expect(root?.value).toBe(5);
    });
  });

  describe('size()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree.size()).toBe(0);
    });

    test('one-node tree', () => {
      const tree = new BinaryTree(10);
      expect(tree.size()).toBe(1);
    });

    test('two-node tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      expect(tree.size()).toBe(2);
    });

    test('non-empty tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      root.left.left = new BinaryTreeNode(15);
      root.right = new BinaryTreeNode(2);
      expect(tree.size()).toBe(4);
    });
  });

  describe('height()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree.height()).toBe(0);
    });

    test('one-node tree', () => {
      const tree = new BinaryTree(10);
      expect(tree.height()).toBe(0);
    });

    test('two-node tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      expect(tree.height()).toBe(1);
    });

    test('non-empty tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      root.left.left = new BinaryTreeNode(15);
      root.right = new BinaryTreeNode(2);
      expect(tree.height()).toBe(2);
    });
  });

  describe('inOrder()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree.inOrder()).toEqual([]);
    });

    test('one-node tree', () => {
      const tree = new BinaryTree(10);
      expect(tree.inOrder()).toEqual([10]);
    });

    test('three-node tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      root.right = new BinaryTreeNode(15);
      expect(tree.inOrder()).toEqual([5, 10, 15]);
    });

    test('non-empty tree', () => {
      const tree = createTree();
      expect(tree.inOrder()).toEqual([
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
      ]);
    });
  });

  describe('preOrder()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree.preOrder()).toEqual([]);
    });

    test('one-node tree', () => {
      const tree = new BinaryTree(10);
      expect(tree.preOrder()).toEqual([10]);
    });

    test('three-node tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      root.right = new BinaryTreeNode(15);
      expect(tree.preOrder()).toEqual([10, 5, 15]);
    });

    test('non-empty tree', () => {
      const tree = createTree();
      expect(tree.preOrder()).toEqual([
        'F',
        'B',
        'A',
        'D',
        'C',
        'E',
        'G',
        'I',
        'H',
      ]);
    });
  });

  describe('postOrder()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree.postOrder()).toEqual([]);
    });

    test('one-node tree', () => {
      const tree = new BinaryTree(10);
      expect(tree.postOrder()).toEqual([10]);
    });

    test('three-node tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      root.right = new BinaryTreeNode(15);
      expect(tree.postOrder()).toEqual([5, 15, 10]);
    });

    test('non-empty tree', () => {
      const tree = createTree();
      expect(tree.postOrder()).toEqual([
        'A',
        'C',
        'E',
        'D',
        'B',
        'H',
        'I',
        'G',
        'F',
      ]);
    });
  });

  describe('isBalanced()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree.isBalanced()).toBe(true);
    });

    test('one-node tree', () => {
      const tree = new BinaryTree(10);
      expect(tree.isBalanced()).toBe(true);
    });

    test('three-node tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      root.right = new BinaryTreeNode(15);
      expect(tree.isBalanced()).toBe(true);
    });

    test('linked-list tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.right = new BinaryTreeNode(15);
      root.right.right = new BinaryTreeNode(20);
      expect(tree.isBalanced()).toBe(false);
    });

    test('non-empty tree', () => {
      const tree = createTree();
      expect(tree.isBalanced()).toBe(false);
    });
  });

  describe('isComplete()', () => {
    test('empty tree', () => {
      const tree = new BinaryTree();
      expect(tree.isComplete()).toBe(true);
    });

    test('one-node tree', () => {
      const tree = new BinaryTree(10);
      expect(tree.isComplete()).toBe(true);
    });

    test('two-node tree left', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      expect(tree.isComplete()).toBe(true);
    });

    test('two-node tree right', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.right = new BinaryTreeNode(5);
      expect(tree.isComplete()).toBe(false);
    });

    test('three-node tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.left = new BinaryTreeNode(5);
      root.right = new BinaryTreeNode(15);
      expect(tree.isComplete()).toBe(true);
    });

    test('linked-list tree', () => {
      const tree = new BinaryTree(10);
      const root = tree.root!;
      root.right = new BinaryTreeNode(15);
      root.right.right = new BinaryTreeNode(20);
      expect(tree.isComplete()).toBe(false);
    });
  });
});
