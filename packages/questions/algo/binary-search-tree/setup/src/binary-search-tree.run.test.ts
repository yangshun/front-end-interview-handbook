import BST from './binary-search-tree';

describe('BST', () => {
  test('constructor', () => {
    const bst = new BST();
    expect(bst instanceof BST).toBeTruthy();
  });

  test('insert and search', () => {
    const bst = new BST();
    bst.insert(100);
    expect(bst.search(100)).toBeTruthy();
    bst.insert(200);
    expect(bst.search(200)).toBeTruthy();
    bst.insert(50);
    expect(bst.search(50)).toBeTruthy();
    expect(bst.search(250)).toBeFalsy();
  });

  test('delete', () => {
    const bst = new BST();
    bst.insert(300);
    bst.insert(100);
    bst.insert(200);
    bst.insert(50);
    bst.delete(100);
    expect(bst.search(100)).toBeFalsy();
    expect(bst.search(300)).toBeTruthy();
    expect(bst.search(200)).toBeTruthy();
    bst.delete(300);
    expect(bst.search(300)).toBeFalsy();
    expect(bst.search(50)).toBeTruthy();
  });
});
