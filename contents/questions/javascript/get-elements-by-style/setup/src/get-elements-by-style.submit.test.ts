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
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim(); // Trimming to avoid any leading whitespace nodes.
  return div;
}

describe('getElementsByStyle()', () => {
  test('empty tree', () => {
    const containerEl = createElementFromHtmlString(``);
    const els = getElementsByStyle(containerEl, 'font-size', '12px');
    const expected = containerEl.getElementsByTagName('');

    checkResults(expected, els);
  });

  test('no matches', () => {
    const containerEl = createElementFromHtmlString(
      `<div>
        <span>Span</span>
        <p>Paragraph</p>
        <div></div>
      </div>`,
    );

    const els = getElementsByStyle(containerEl, 'font-size', '120px');
    const expected = containerEl.getElementsByTagName('');
    checkResults(expected, els);
  });

  describe('matches', () => {
    test('matching span', () => {
      const containerEl = createElementFromHtmlString(
        `<div>
          <span style="font-size: 12px">Span</span>
          <p>Paragraph</p>
          <div></div>
        </div>`,
      );

      const els = getElementsByStyle(containerEl, 'font-size', '12px');
      const expected = containerEl.getElementsByTagName('span');
      checkResults(expected, els);
    });

    test('multiple matching elements', () => {
      const containerEl = createElementFromHtmlString(
        `<div>
          <span style="font-size: 12px">Span</span>
          <p>Paragraph</p>
          <div></div>
          <span style="font-size: 12px">Span 2</span>
        </div>`,
      );

      const els = getElementsByStyle(containerEl, 'font-size', '12px');
      const expected = containerEl.getElementsByTagName('span');
      checkResults(expected, els);
    });

    test('matches one level of children', () => {
      const containerEl = createElementFromHtmlString(
        `<div id="root">
          <span class="match" style="color: rgb(255, 255, 255)">
            Span
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </span>
          <p>Paragraph</p>
          <div>
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </div>
        </div>`,
      );

      const els = getElementsByStyle(
        containerEl.querySelector('#root')!,
        'color',
        'rgb(255, 255, 255)',
      );
      const expected = containerEl.getElementsByClassName('match');
      checkResults(expected, els);
    });

    test('matches two levels of children', () => {
      const containerEl = createElementFromHtmlString(
        `<div id="root">
          <span class="match" style="color: rgb(255, 255, 255)">
            Span
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </span>
          <div>
            <p>
              <span class="match" style="color: rgb(255, 255, 255)">Span</span>
            </p>
          </div>
          <div>
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </div>
        </div>`,
      );

      const els = getElementsByStyle(
        containerEl.querySelector('#root')!,
        'color',
        'rgb(255, 255, 255)',
      );
      const expected = containerEl.getElementsByClassName('match');
      checkResults(expected, els);
    });

    test('ignores comment nodes', () => {
      const containerEl = createElementFromHtmlString(
        `<div id="root">
          <span class="match" style="color: rgb(255, 255, 255)">
            <!-- Here's a comment -->
            Span
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </span>
          <p>Paragraph</p>
          <div>
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </div>
        </div>`,
      );

      const els = getElementsByStyle(
        containerEl.querySelector('#root')!,
        'color',
        'rgb(255, 255, 255)',
      );
      const expected = containerEl.getElementsByClassName('match');
      checkResults(expected, els);
    });

    test("doesn't include itself", () => {
      const containerEl = createElementFromHtmlString(
        `<div id="root" style="color: rgb(255, 255, 255)">
          <span class="match" style="color: rgb(255, 255, 255)">
            <!-- Here's a comment -->
            Span
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </span>
          <p>Paragraph</p>
          <div>
            <span class="match" style="color: rgb(255, 255, 255)">Span</span>
          </div>
        </div>`,
      );

      const els = getElementsByStyle(
        containerEl.querySelector('#root')!,
        'color',
        'rgb(255, 255, 255)',
      );
      const expected = containerEl.getElementsByClassName('match');
      checkResults(expected, els);
    });
  });
});
