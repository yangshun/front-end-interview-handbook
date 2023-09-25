import getElementsByTagName from './get-elements-by-tag-name';

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

describe('getElementsByTagName', () => {
  test('empty tree', () => {
    const document = new DOMParser().parseFromString(``, 'text/html');
    const divs = getElementsByTagName(document.body, 'div');
    const expected = document.body.getElementsByTagName('div');

    checkResults(expected, divs);
  });

  test('non-existent tags', () => {
    const document = new DOMParser().parseFromString(
      `<div>
        <span>Span</span>
        <p>Paragraph</p>
        <div></div>
      </div>`,
      'text/html',
    );

    const imgs = getElementsByTagName(document.body, 'img');
    const expected = document.body.getElementsByTagName('img');
    checkResults(expected, imgs);
  });

  test("doesn't include itself", () => {
    const document = new DOMParser().parseFromString(
      `<div></div>`,
      'text/html',
    );

    const body = getElementsByTagName(document.body, 'body');
    const expected = document.body.getElementsByTagName('body');
    checkResults(expected, body);
  });

  test('single element with no nodes', () => {
    const document = new DOMParser().parseFromString(
      `<div></div>`,
      'text/html',
    );

    const divs = getElementsByTagName(document.body, 'div');
    const expected = document.body.getElementsByTagName('div');

    checkResults(expected, divs);
  });

  test('comment nodes', () => {
    const document = new DOMParser().parseFromString(
      `<div>
        <!-- Here's a comment -->
        <div>Hello</div>
      </div>`,
      'text/html',
    );

    const divs = getElementsByTagName(document.body, 'div');
    const expected = document.body.getElementsByTagName('div');

    checkResults(expected, divs);
  });

  test('single element with child nodes', () => {
    const document = new DOMParser().parseFromString(
      `<div>
        <span>Span</span>
        <p>Paragraph</p>
      </div>`,
      'text/html',
    );

    const divs = getElementsByTagName(document.body, 'div');
    const expected = document.body.getElementsByTagName('div');

    checkResults(expected, divs);
  });
});
