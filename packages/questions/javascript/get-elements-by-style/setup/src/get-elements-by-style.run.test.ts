import getElementsByStyle from './get-elements-by-style';

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
function createElementFromHtmlString(htmlString: string) {
  // Use `document.createElement()` because jsdom@16 has some issues with `getComputedStyle()`
  // with elements created using `DOMParser().parseFromString()`.
  const body = document.createElement('body');
  body.innerHTML = htmlString.trim(); // Trimming to avoid any leading whitespace nodes.
  return body;
}

describe('getElementsByStyle()', () => {
  test('empty tree', () => {
    const bodyEl = createElementFromHtmlString(``);
    const els = getElementsByStyle(bodyEl, 'font-size', '12px');
    const expected = bodyEl.getElementsByTagName('');

    checkResults(expected, els);
  });

  test('matching span', () => {
    const bodyEl = createElementFromHtmlString(`
      <div>
        <span style="font-size: 12px">Span</span>
        <p>Paragraph</p>
        <div></div>
      </div>`);

    const els = getElementsByStyle(bodyEl, 'font-size', '12px');
    const expected = bodyEl.getElementsByTagName('span');

    checkResults(expected, els);
  });

  test('multiple matching elements', () => {
    const bodyEl = createElementFromHtmlString(`
      <div>
        <span style="font-size: 12px">Span</span>
        <p>Paragraph</p>
        <div></div>
      </div>`);

    const els = getElementsByStyle(bodyEl, 'font-size', '12px');
    const expected = bodyEl.getElementsByTagName('span');

    checkResults(expected, els);
  });
});
