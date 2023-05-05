import getElementsByTagName from './get-elements-by-tag-name';

describe('getElementsByTagName', () => {
  function checkResults(expected, received) {
    expect(received.length).toBe(expected.length);
    for (let i = 0; i < received.length; i++) {
      expect(received[i].isEqualNode(expected[i])).toBe(true);
    }
  }

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

  describe('deeply-nested trees', () => {
    test('shallow', () => {
      const document = new DOMParser().parseFromString(
        `<div>
          <span>Span</span>
          <p>Paragraph</p>
          <div></div>
        </div>`,
        'text/html',
      );

      const divs = getElementsByTagName(document.body, 'div');
      const expectedDivs = document.body.getElementsByTagName('div');
      checkResults(expectedDivs, divs);

      const spans = getElementsByTagName(document.body, 'span');
      const expectedSpans = document.body.getElementsByTagName('span');
      checkResults(expectedSpans, spans);
    });

    test('moderately deep', () => {
      const document = new DOMParser().parseFromString(
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

      const divs = getElementsByTagName(document.body, 'div');
      const expectedDivs = document.body.getElementsByTagName('div');
      checkResults(expectedDivs, divs);

      const spans = getElementsByTagName(document.body, 'span');
      const expectedSpans = document.body.getElementsByTagName('span');
      checkResults(expectedSpans, spans);
    });

    test('very deep', () => {
      const document = new DOMParser().parseFromString(
        `<div>
          <span>Span</span>
          <p>Paragraph</p>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      Deep div
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          Hello
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      Deep div
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`,
        'text/html',
      );

      const divs = getElementsByTagName(document.body, 'div');
      const expectedDivs = document.body.getElementsByTagName('div');
      checkResults(expectedDivs, divs);

      const spans = getElementsByTagName(document.body, 'span');
      const expectedSpans = document.body.getElementsByTagName('span');
      checkResults(expectedSpans, spans);
    });
  });

  test('non-lower case tag name', () => {
    const document = new DOMParser().parseFromString(
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

    const divs = getElementsByTagName(document.body, 'DIV');
    const expectedDivs = document.body.getElementsByTagName('DIV');
    checkResults(expectedDivs, divs);

    const spans = getElementsByTagName(document.body, 'sPaN');
    const expectedSpans = document.body.getElementsByTagName('sPaN');
    checkResults(expectedSpans, spans);
  });
});
