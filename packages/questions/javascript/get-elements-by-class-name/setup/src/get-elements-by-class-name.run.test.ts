import getElementsByClassName from './get-elements-by-class-name';

function checkResults(
  expected: HTMLCollectionOf<Element>,
  received: Array<Element>,
) {
  expect(received.length).toBe(expected.length);
  // Inefficient O(n^2) check so that order doesn't matter.
  for (let i = 0; i < expected.length; i++) {
    expect(received.some((node) => node.isEqualNode(expected[i]))).toBe(true);
  }
}

describe('getElementsByClassName', () => {
  test('empty tree', () => {
    const doc = new DOMParser().parseFromString(``, 'text/html');
    const els = getElementsByClassName(doc.body, 'foo');
    const expected = doc.body.getElementsByClassName('foo');

    checkResults(expected, els);
  });

  test('non-existent class names', () => {
    const doc = new DOMParser().parseFromString(
      `<div class="foo">
        <span class="foo">Span</span>
        <p>Paragraph</p>
        <div></div>
      </div>`,
      'text/html',
    );

    const els = getElementsByClassName(doc.body, 'asd');
    const expected = doc.body.getElementsByClassName('asd');
    checkResults(expected, els);
  });

  test('multiple matching elements', () => {
    const doc = new DOMParser().parseFromString(
      `<div class="foo">
        <div class="fooz">Fooz</div>
        <div class="foo">Foo</div>
      </div>`,
      'text/html',
    );

    const divs = getElementsByClassName(doc.body, 'foo');
    const expected = doc.body.getElementsByClassName('foo');

    checkResults(expected, divs);
  });
});
