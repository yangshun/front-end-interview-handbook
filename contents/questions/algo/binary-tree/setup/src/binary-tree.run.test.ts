import { BinaryTree, BinaryTreeNode } from './binary-tree';

describe('BinaryTree', () => {
  test('constructor', () => {
    const tree = new BinaryTree();
    expect(tree instanceof BinaryTree).toBeTruthy();
    expect(tree.size()).toBe(0);
    expect(tree.height()).toBe(0);
  });

  test('size & height', () => {
    const tree = new BinaryTree();
    tree.root = new BinaryTreeNode(10);
    const root = tree.root!;
    expect(tree.size()).toBe(1);
    expect(tree.height()).toBe(0);
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(15);
    expect(tree.height()).toBe(1);
    expect(tree.size()).toBe(3);
    root.left.left = new BinaryTreeNode(3);
    expect(tree.height()).toBe(2);
  });

  test('Orders', () => {
    const tree = new BinaryTree();
    expect(tree.inOrder()).toEqual([]);
    tree.root = new BinaryTreeNode(10);
    const root = tree.root!;
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(15);
    root.left.left = new BinaryTreeNode(3);
    root.left.right = new BinaryTreeNode(7);
    expect(tree.inOrder()).toEqual([3, 5, 7, 10, 15]);
    expect(tree.preOrder()).toEqual([10, 5, 3, 7, 15]);
    expect(tree.postOrder()).toEqual([3, 7, 5, 15, 10]);
  });

  test('isBalanced', () => {
    const tree = new BinaryTree();
    expect(tree.isBalanced()).toBeTruthy();
    tree.root = new BinaryTreeNode(10);
    expect(tree.isBalanced()).toBeTruthy();
    const root = tree.root!;
    root.left = new BinaryTreeNode(5);
    expect(tree.isBalanced()).toBeTruthy();
  });

  test('isComplete', () => {
    const tree = new BinaryTree();
    expect(tree.isComplete()).toBeTruthy();
    tree.root = new BinaryTreeNode(10);
    expect(tree.isComplete()).toBeTruthy();
    const root = tree.root!;
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(15);
    expect(tree.isComplete()).toBeTruthy();
  });
});
