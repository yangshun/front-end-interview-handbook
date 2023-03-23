import isSameTree from './identical-dom-trees';

/* eslint-disable no-undef */
describe('isSameTree', () => {
  test('single nodes', () => {
    const treeA = document.createElement('div');
    const treeB = document.createElement('div');
    expect(isSameTree(treeA, treeB)).toBe(true);
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
    expect(isSameTree(treeA.body, treeB.body)).toBe(true);
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
    expect(isSameTree(treeA.body, treeB.body)).toBe(false);
  });

  test('nodes with different tagnames', () => {
    const treeA = new DOMParser().parseFromString(
      `<div>hello</div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(`<p>hello</p>`, 'text/html');

    expect(isSameTree(treeA.body, treeB.body)).toBe(false);
  });
});
