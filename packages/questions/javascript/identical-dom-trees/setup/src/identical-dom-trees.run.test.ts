import identicalDOMTrees from './identical-dom-trees';

describe('identicalDOMTrees', () => {
  test('single nodes', () => {
    const treeA = document.createElement('div');
    const treeB = document.createElement('div');
    expect(identicalDOMTrees(treeA, treeB)).toBe(true);
  });

  test('nodes with same children', () => {
    const treeA = new DOMParser().parseFromString(
      `<div><span>Foo</span><p>Para</p></div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div><span>Foo</span><p>Para</p></div>`,
      'text/html',
    );
    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(true);
  });

  test('nodes with different children', () => {
    const treeA = new DOMParser().parseFromString(
      `<div><span>Foo</span><p>Para</p></div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div><span>Bar</span><p>Para</p></div>`,
      'text/html',
    );
    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(false);
  });
});
