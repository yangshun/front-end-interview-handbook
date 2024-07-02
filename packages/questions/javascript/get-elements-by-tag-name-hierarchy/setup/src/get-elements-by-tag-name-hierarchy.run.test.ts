import getElementsByTagNameHierarchy from './get-elements-by-tag-name-hierarchy';

function checkResults(expected: NodeListOf<Element>, received: Array<Element>) {
  expect(received.length).toBe(expected.length);
  // Inefficient O(n^2) check so that order doesn't matter.
  for (let i = 0; i < expected.length; i++) {
    expect(received.some((node) => node.isEqualNode(expected[i]))).toBe(true);
  }
}

describe('getElementsByTagNameHierarchy()', () => {
  test('empty tree', () => {
    const doc = new DOMParser().parseFromString(``, 'text/html');
    const els = getElementsByTagNameHierarchy(doc, 'div');
    const expected = doc.querySelectorAll('div');

    checkResults(expected, els);
  });

  test('single element with no nodes', () => {
    const doc = new DOMParser().parseFromString(`<div></div>`, 'text/html');

    const els = getElementsByTagNameHierarchy(doc, 'div');
    const expected = doc.querySelectorAll('div');

    checkResults(expected, els);
  });

  describe('single layer', () => {
    test('single descendant node', () => {
      const doc = new DOMParser().parseFromString(
        `<div><span></span></div>`,
        'text/html',
      );

      const els = getElementsByTagNameHierarchy(doc, 'div span');
      const expected = doc.querySelectorAll('div span');

      checkResults(expected, els);
    });

    test('multiple matching descendant nodes', () => {
      const doc = new DOMParser().parseFromString(
        `<div>
          <span>Span</span>
          <p>Paragraph</p>
          <span>Span 2</span>
        </div>`,
        'text/html',
      );

      const els = getElementsByTagNameHierarchy(doc, 'div span');
      const expected = doc.querySelectorAll('div span');

      checkResults(expected, els);
    });
  });

  test('non-existent tags', () => {
    const doc = new DOMParser().parseFromString(
      `<div>
        <span>Span</span>
        <p>Paragraph</p>
        <div></div>
      </div>`,
      'text/html',
    );

    const els = getElementsByTagNameHierarchy(doc, 'img');
    const expected = doc.querySelectorAll('img');

    checkResults(expected, els);
  });

  test('ignores comment nodes', () => {
    const doc = new DOMParser().parseFromString(
      `<div>
        <!-- Here's a comment -->
        <div>Hello</div>
      </div>`,
      'text/html',
    );

    const els = getElementsByTagNameHierarchy(doc, 'div');
    const expected = doc.querySelectorAll('div');

    checkResults(expected, els);
  });
});
