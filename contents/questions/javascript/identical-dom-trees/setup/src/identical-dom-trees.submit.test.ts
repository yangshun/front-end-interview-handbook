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

  test('nodes with different tagnames', () => {
    const treeA = new DOMParser().parseFromString(
      `<div>Foo</div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(`<p>Foo</p>`, 'text/html');

    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(false);
  });

  test('nodes with same attributes', () => {
    const treeA = new DOMParser().parseFromString(
      `<div class="foo" data-id="123">hello</div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div class="foo" data-id="123">hello</div>`,
      'text/html',
    );

    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(true);
  });

  test('nodes with different attributes', () => {
    const treeA = new DOMParser().parseFromString(
      `<div class="foo">hello</div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div class="bar">hello</div>`,
      'text/html',
    );

    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(false);
  });

  test('nodes with different styles', () => {
    const treeA = new DOMParser().parseFromString(
      `<div style="color: red;">hello</div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div style="color: blue;">hello</div>`,
      'text/html',
    );

    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(false);
  });

  test('nodes with different comment and text nodes', () => {
    const treeA = new DOMParser().parseFromString(
      `<div><span>Foo</span><!-- comment --></div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div><span>Foo</span>text node</div>`,
      'text/html',
    );

    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(false);
  });

  test('nodes with different numbers of children', () => {
    const treeA = new DOMParser().parseFromString(
      `<div>
        <span>Foo</span>
        <p>Para</p>
      </div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div>
        <span>Foo</span>
        <p>Para</p>
        <div></div>
      </div>`,
      'text/html',
    );
    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(false);
  });

  test('nodes with nested elements', () => {
    const treeA = new DOMParser().parseFromString(
      `<div>
        <span>Foo</span>
        <p>Para</p>
        <div>
          <span>Bar</span>
          <p>Para</p>
        </div>
      </div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div>
        <span>Foo</span>
        <p>Para</p>
        <div>
          <span>Bar</span>
          <p>Para</p>
        </div>
      </div>`,
      'text/html',
    );
    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(true);
  });

  test('nodes with nested elements in different order', () => {
    const treeA = new DOMParser().parseFromString(
      `<div>
        <span>Foo</span>
        <p>Para</p>
        <div>
          <span>Bar</span>
          <p>Para</p>
        </div>
      </div>`,
      'text/html',
    );
    const treeB = new DOMParser().parseFromString(
      `<div>
        <div>
          <p>Para</p>
          <span>Bar</span>
        </div>
        <span>Foo</span>
        <p>Para</p>
      </div>`,
      'text/html',
    );
    expect(identicalDOMTrees(treeA.body, treeB.body)).toBe(false);
  });
});
