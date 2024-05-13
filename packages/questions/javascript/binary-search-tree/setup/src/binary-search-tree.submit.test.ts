import BST from './binary-search-tree';

describe('BST', () => {
  test('constructor', () => {
    const bst = new BST();
    expect(bst instanceof BST).toBeTruthy();
    expect(bst.root).toBeNull();
  });

  test('insert and search', () => {
    const bst = new BST();
    bst.insert(100);
    expect(bst.search(100)).toBeTruthy();
    bst.insert(200);
    expect(bst.search(200)).toBeTruthy();
    bst.insert(50);
    expect(bst.search(50)).toBeTruthy();
  });

  test('delete leaf node', () => {
    const bst = new BST();
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.delete(30);
    expect(bst.search(30)).toBeFalsy();
    expect(bst.root?.left).toBeNull();
  });

  test('delete node with one child', () => {
    const bst = new BST();
    bst.insert(50);
    bst.insert(30);
    bst.insert(20);
    bst.delete(30);
    expect(bst.search(30)).toBeFalsy();
    expect(bst.root?.left?.value).toBe(20);
  });

  test('delete node with two children', () => {
    const bst = new BST();
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.insert(20);
    bst.insert(40);
    bst.delete(30);
    expect(bst.search(30)).toBeFalsy();
    expect(bst.root?.left?.value).not.toBe(30);
  });

  test('delete root node', () => {
    const bst = new BST();
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.delete(50);
    expect(bst.search(50)).toBeFalsy();
    expect(bst.root?.value).not.toBe(50);
  });

  test('insert many and test structure', () => {
    const bst = new BST();
    const values = [50, 30, 70, 20, 40, 60, 80];
    values.forEach((value) => bst.insert(value));
    expect(bst.root?.value).toBe(50);
    expect(bst.root?.left?.value).toBe(30);
    expect(bst.root?.right?.value).toBe(70);
    expect(bst.root?.left?.left?.value).toBe(20);
    expect(bst.root?.left?.right?.value).toBe(40);
    expect(bst.root?.right?.left?.value).toBe(60);
    expect(bst.root?.right?.right?.value).toBe(80);
  });

  test('search non-existent value', () => {
    const bst = new BST();
    bst.insert(50);
    expect(bst.search(100)).toBeFalsy();
  });

  test('complex insert and delete sequence', () => {
    const bst = new BST();
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.insert(20);
    bst.insert(40);
    bst.insert(60);
    bst.insert(80);
    bst.delete(70);
    expect(bst.search(70)).toBeFalsy();
    bst.delete(50);
    expect(bst.search(50)).toBeFalsy();
    bst.insert(35);
    bst.insert(45);
    expect(bst.search(35)).toBeTruthy();
    expect(bst.search(45)).toBeTruthy();
  });

  test('delete on empty BST', () => {
    const bst = new BST();
    bst.delete(100);
    expect(bst.root).toBeNull();
  });

  test('maintaining state after multiple operations', () => {
    const bst = new BST();
    bst.insert(50);
    bst.insert(30);
    bst.insert(60);
    bst.delete(50);
    bst.insert(55);
    bst.insert(65);
    expect(bst.search(55)).toBeTruthy();
    expect(bst.search(65)).toBeTruthy();
    bst.delete(65);
    expect(bst.search(65)).toBeFalsy();
  });

  test('integration test of operations', () => {
    const bst = new BST();
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.insert(20);
    bst.insert(60);
    bst.insert(80);
    bst.insert(40);
    bst.delete(50);
    expect(bst.search(50)).toBeFalsy();
    bst.insert(55);
    expect(bst.search(55)).toBeTruthy();
    bst.delete(55);
    expect(bst.search(55)).toBeFalsy();
  });
});
