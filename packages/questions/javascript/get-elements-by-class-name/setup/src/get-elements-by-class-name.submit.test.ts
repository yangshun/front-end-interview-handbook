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

  describe('single class name', () => {
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

    test('ignores comment nodes', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo">
        <!-- Here's a comment -->
        <div class="foo">Hello</div>
      </div>`,
        'text/html',
      );

      const els = getElementsByClassName(doc.body, 'foo');
      const expected = doc.body.getElementsByClassName('foo');

      checkResults(expected, els);
    });

    test("doesn't include itself", () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo"></div>`,
        'text/html',
      );

      const body = getElementsByClassName(doc.body.children[0], 'foo');
      const expected = doc.body.children[0].getElementsByClassName('foo');
      checkResults(expected, body);
    });

    test('elements with duplicated classnames', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo foo foo">
          <div class="bar foo">Hello</div>
        </div>`,
        'text/html',
      );

      const els = getElementsByClassName(doc.body, 'foo');
      const expected = doc.body.getElementsByClassName('foo');

      checkResults(expected, els);
    });
  });

  describe('multiple class names', () => {
    test('non-duplicated', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo bar baz">
          <span class="bar baz">Span</span>
          <p class="foo baz">Paragraph</p>
          <div class="foo bar"></div>
        </div>`,
        'text/html',
      );

      const els1 = getElementsByClassName(doc.body, 'foo bar');
      const expectedEls1 = doc.body.getElementsByClassName('foo bar');
      checkResults(expectedEls1, els1);

      const els2 = getElementsByClassName(doc.body, 'bar');
      const expectedEls2 = doc.body.getElementsByClassName('bar');
      checkResults(expectedEls2, els2);

      const els3 = getElementsByClassName(doc.body, 'bar baz');
      const expectedEls3 = doc.body.getElementsByClassName('bar baz');
      checkResults(expectedEls3, els3);
    });

    test('duplicated class names in input', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo bar">
          <span class="bar baz">Span</span>
          <p class="foo baz">Paragraph</p>
          <div class="foo bar"></div>
        </div>`,
        'text/html',
      );

      const els1 = getElementsByClassName(doc.body, 'foo foo bar');
      const expectedEls1 = doc.body.getElementsByClassName('foo foo bar');
      checkResults(expectedEls1, els1);

      const els2 = getElementsByClassName(doc.body, 'bar bar');
      const expectedEls2 = doc.body.getElementsByClassName('bar bar');
      checkResults(expectedEls2, els2);

      const els3 = getElementsByClassName(doc.body, 'bar baz bar');
      const expectedEls3 = doc.body.getElementsByClassName('bar baz bar');
      checkResults(expectedEls3, els3);
    });

    test('duplicated class names in DOM', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo bar foo baz">
          <span class="bar baz bar">Span</span>
          <p class="foo baz baz">Paragraph</p>
          <div class="foo bar bar bar"></div>
        </div>`,
        'text/html',
      );

      const els1 = getElementsByClassName(doc.body, 'foo foo bar');
      const expectedEls1 = doc.body.getElementsByClassName('foo foo bar');
      checkResults(expectedEls1, els1);

      const els2 = getElementsByClassName(doc.body, 'bar bar');
      const expectedEls2 = doc.body.getElementsByClassName('bar bar');
      checkResults(expectedEls2, els2);

      const els3 = getElementsByClassName(doc.body, 'bar baz bar');
      const expectedEls3 = doc.body.getElementsByClassName('bar baz bar');
      checkResults(expectedEls3, els3);
    });
  });

  test('case-sensitivity', () => {
    const doc = new DOMParser().parseFromString(
      `<!DOCTYPE html>
      <div class="foo bar foo baz">
        <span class="bar baz bar">Span</span>
        <p class="foo baz baz">Paragraph</p>
        <div id="1" class="FOO BAR"></div>
      </div>`,
      'text/html',
    );

    const els1 = getElementsByClassName(doc.body, 'foo foo bar');
    const expectedEls1 = doc.body.getElementsByClassName('foo foo bar');
    checkResults(expectedEls1, els1);

    const els2 = getElementsByClassName(doc.body, 'FOO BAR');
    const expectedEls2 = doc.body.getElementsByClassName('FOO BAR');
    checkResults(expectedEls2, els2);
  });

  describe('extra whitespace in classes', () => {
    test('in class attributes', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo bar  foo  baz">
          <span class="   bar baz  bar">Span</span>
          <p class="  foo baz  baz ">Paragraph</p>
          <div class=" foo bar   bar  bar  "></div>
        </div>`,
        'text/html',
      );

      const els1 = getElementsByClassName(doc.body, 'foo foo bar');
      const expectedEls1 = doc.body.getElementsByClassName('foo foo bar');
      checkResults(expectedEls1, els1);

      const els2 = getElementsByClassName(doc.body, 'bar bar');
      const expectedEls2 = doc.body.getElementsByClassName('bar bar');
      checkResults(expectedEls2, els2);

      const els3 = getElementsByClassName(doc.body, 'bar baz bar');
      const expectedEls3 = doc.body.getElementsByClassName('bar baz bar');
      checkResults(expectedEls3, els3);
    });

    test('in input class', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo bar foo baz">
          <span class="bar baz bar">Span</span>
          <p class="foo baz baz">Paragraph</p>
          <div class="foo bar bar bar"></div>
        </div>`,
        'text/html',
      );

      const els1 = getElementsByClassName(doc.body, '  foo   foo bar ');
      const expectedEls1 = doc.body.getElementsByClassName('  foo   foo bar ');
      checkResults(expectedEls1, els1);

      const els2 = getElementsByClassName(doc.body, '   bar  bar ');
      const expectedEls2 = doc.body.getElementsByClassName('   bar  bar ');
      checkResults(expectedEls2, els2);

      const els3 = getElementsByClassName(doc.body, '  bar baz   bar ');
      const expectedEls3 = doc.body.getElementsByClassName('  bar baz   bar ');
      checkResults(expectedEls3, els3);
    });

    test('both attributes and input class', () => {
      const doc = new DOMParser().parseFromString(
        `<div class="foo  bar  foo  baz">
          <span class="   bar baz  bar">Span</span>
          <p class="  foo baz  baz ">Paragraph</p>
          <div class=" foo bar   bar  bar  "></div>
        </div>`,
        'text/html',
      );

      const els1 = getElementsByClassName(doc.body, '  foo   foo bar ');
      const expectedEls1 = doc.body.getElementsByClassName('  foo   foo bar ');
      checkResults(expectedEls1, els1);

      const els2 = getElementsByClassName(doc.body, '   bar  bar ');
      const expectedEls2 = doc.body.getElementsByClassName('   bar  bar ');
      checkResults(expectedEls2, els2);

      const els3 = getElementsByClassName(doc.body, '  bar baz   bar ');
      const expectedEls3 = doc.body.getElementsByClassName('  bar baz   bar ');
      checkResults(expectedEls3, els3);
    });
  });
});
