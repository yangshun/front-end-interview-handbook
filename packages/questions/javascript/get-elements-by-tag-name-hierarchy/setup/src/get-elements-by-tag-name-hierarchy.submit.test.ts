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

  describe('varying tag token length', () => {
    describe('one tag', () => {
      test('no match', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span></span>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'p');
        const expected = doc.querySelectorAll('p');
        checkResults(expected, els);
      });

      test('one match', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span></span>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'span');
        const expected = doc.querySelectorAll('span');
        checkResults(expected, els);
      });

      test('two matches', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span></span>
            <p></p>
            <span></span>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'span');
        const expected = doc.querySelectorAll('span');
        checkResults(expected, els);
      });

      test('inner matches', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span>
              <span></span>
            </span>
            <p></p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'span');
        const expected = doc.querySelectorAll('span');
        checkResults(expected, els);
      });

      test('inner matches deep', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span>
              <span></span>
            </span>
            <p>
              <span>
                <span></span>
              </span>
            </p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'span');
        const expected = doc.querySelectorAll('span');
        checkResults(expected, els);
      });
    });

    describe('two tags', () => {
      test('no match', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span></span>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'span div');
        const expected = doc.querySelectorAll('span div');
        checkResults(expected, els);
      });

      test('one match', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span></span>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div span');
        const expected = doc.querySelectorAll('div span');
        checkResults(expected, els);
      });

      test('two matches', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span></span>
            <p></p>
            <span></span>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div span');
        const expected = doc.querySelectorAll('div span');
        checkResults(expected, els);
      });

      test('inner matches', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span>
              <span></span>
            </span>
            <p></p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div span');
        const expected = doc.querySelectorAll('div span');
        checkResults(expected, els);
      });

      test('inner matches deep', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span>
              <span></span>
            </span>
            <p>
              <span>
                <span></span>
              </span>
            </p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'p span');
        const expected = doc.querySelectorAll('p span');
        checkResults(expected, els);
      });

      test('inner matches deep same tag', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span>
              <span></span>
            </span>
            <p>
              <span>
                <span></span>
              </span>
            </p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'span span');
        const expected = doc.querySelectorAll('span span');
        checkResults(expected, els);
      });
    });

    describe('three tags', () => {
      test('no match', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <p>
              <span></span>
            </p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div span p');
        const expected = doc.querySelectorAll('div span p');
        checkResults(expected, els);
      });

      test('one match', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <p>
              <span></span>
            </p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div p span');
        const expected = doc.querySelectorAll('div p span');
        checkResults(expected, els);
      });

      test('two matches', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <p>
              <span></span>
            </p>
            <p>
              <span></span>
            </p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div p span');
        const expected = doc.querySelectorAll('div p span');
        checkResults(expected, els);
      });

      test('inner matches', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span>
              <span></span>
            </span>
            <p></p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div span span');
        const expected = doc.querySelectorAll('div span span');
        checkResults(expected, els);
      });

      test('inner matches deep', () => {
        const doc = new DOMParser().parseFromString(
          `<div>
            <span>
              <span></span>
            </span>
            <p>
              <span>
                <span></span>
              </span>
            </p>
          </div>`,
          'text/html',
        );

        const els = getElementsByTagNameHierarchy(doc, 'div p span');
        const expected = doc.querySelectorAll('div p span');
        checkResults(expected, els);
      });
    });
  });

  test('huge DOM tree', () => {
    const doc = new DOMParser().parseFromString(
      `<div>
        <span>Span</span>
        <p>Paragraph</p>
        <div>
          <div>
            <p>
              <div>
                <div>
                  <span></span>
                  <div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>
                <div>
                  <span></span>
                  <div>
                    <div>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>`,
      'text/html',
    );

    checkResults(
      doc.querySelectorAll('div div'),
      getElementsByTagNameHierarchy(doc, 'div div'),
    );
    checkResults(
      doc.querySelectorAll('span'),
      getElementsByTagNameHierarchy(doc, 'span'),
    );
    checkResults(
      doc.querySelectorAll('div p'),
      getElementsByTagNameHierarchy(doc, 'div p'),
    );
    checkResults(
      doc.querySelectorAll('div p span'),
      getElementsByTagNameHierarchy(doc, 'div p span'),
    );
    checkResults(
      doc.querySelectorAll('div div span'),
      getElementsByTagNameHierarchy(doc, 'div div span'),
    );
    checkResults(
      doc.querySelectorAll('p span'),
      getElementsByTagNameHierarchy(doc, 'p span'),
    );
    checkResults(
      doc.querySelectorAll('div p div span'),
      getElementsByTagNameHierarchy(doc, 'div p div span'),
    );
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

  test('mixed case tag names', () => {
    const doc = new DOMParser().parseFromString(
      `<div>
          <span>Span</span>
          <p>Paragraph</p>
          <div>
            <div>
              <span>Hello</span>
            </div>
          </div>
        </div>
        <div>Hello</div>`,
      'text/html',
    );

    const divs = getElementsByTagNameHierarchy(doc, 'DIV div');
    const expectedDivs = doc.querySelectorAll('DIV div'.toLocaleLowerCase());
    checkResults(expectedDivs, divs);

    const spans = getElementsByTagNameHierarchy(doc, 'div P sPaN');
    const expectedSpans = doc.querySelectorAll(
      'div P sPaN'.toLocaleLowerCase(),
    );
    checkResults(expectedSpans, spans);
  });
});
