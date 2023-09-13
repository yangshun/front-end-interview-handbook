import tableOfContents from './table-of-contents';

describe('tableOfContents', () => {
  test('empty', () => {
    const doc = new DOMParser().parseFromString(
      `
<!DOCTYPE html>
<html>
<body>
</body>
</html>`,
      'text/html',
    );
    expect(tableOfContents(doc).replace(/\s/g, '')).toBe(``);
  });

  describe('only one tag type', () => {
    test('only h1', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <html>
  <body>
    <h1>Blogpost</h1>
  </body>
  </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul><li>Blogpost</li></ul>`,
      );
    });

    test('only h2s', () => {
      const doc = new DOMParser().parseFromString(
        `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Blogpost</h1>
      <h2>Foo</h2>
      <h2>Bar</h2>
      <h2>Baz</h2>
    </body>
    </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>
            Blogpost
            <ul>
              <li>Foo</li>
              <li>Bar</li>
              <li>Baz</li>
            </ul>
          </li>
        </ul>
        `.replace(/\s/g, ''),
      );
    });

    test('only h3s', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <html>
  <body>
    <h3>Foo</h3>
    <h3>Bar</h3>
    <h3>Baz</h3>
  </body>
  </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>Foo</li>
          <li>Bar</li>
          <li>Baz</li>
        </ul>`.replace(/\s/g, ''),
      );
    });

    test('nested DOM', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <html>
  <body>
    <div>
      <h2>Foo</h2>
    </div>
    <h2>Bar</h2>
    <div>
      <div>
        <h2>Baz</h2>
      </div>
    </div>
  </body>
  </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>Foo</li>
          <li>Bar</li>
          <li>Baz</li>
        </ul>`.replace(/\s/g, ''),
      );
    });
  });

  describe('nested', () => {
    test('strictly ascending', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <html>
  <body>
    <h2>Foo</h2>
    <h3>Bar</h3>
    <h4>Baz</h4>
    <h5>Qux</h5>
    <h6>Quxx</h6>
  </body>
  </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>Foo
            <ul>
              <li>
                Bar
                <ul>
                  <li>
                    Baz
                    <ul>
                      <li>
                        Qux
                        <ul>
                          <li>Quxx</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>`.replace(/\s/g, ''),
      );
    });

    test('ascending and descending once', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <html>
  <body>
    <h2>Foo</h2>
    <h2>Bar</h2>
    <h3>Baz</h3>
    <h3>Qux</h3>
    <h2>Quxx</h2>
  </body>
  </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>Foo</li>
          <li>
            Bar
            <ul>
              <li>Baz</li>
              <li>Qux</li>
            </ul>
          </li>
          <li>Quxx</li>
        </ul>`.replace(/\s/g, ''),
      );
    });

    test('ascending and descending many times', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <body>
    <h1>Heading1</h1>
    <h2>Heading2a</h2>
    <h2>Heading2b</h2>
    <h3>Heading3a</h3>
    <h3>Heading3b</h3>
    <h4>Heading4</h3>
    <h2>Heading2c</h2>
  </body>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>
            Heading1
            <ul>
              <li>Heading2a</li>
              <li>
                Heading2b
                <ul>
                  <li>Heading3a</li>
                  <li>
                    Heading3b
                    <ul>
                      <li>Heading4</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Heading2c</li>
            </ul>
          </li>
        </ul>`.replace(/\s/g, ''),
      );
    });

    test('ascending and descending all the way', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <html>
  <body>
    <h2>Foo</h2>
    <h2>Bar</h2>
    <h3>Baz</h3>
    <h4>Baz2</h4>
    <h3>Qux</h3>
    <h4>Baz3</h4>
    <h4>Baz4</h4>
    <h2>Quxx</h2>
  </body>
  </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>Foo</li>
          <li>
            Bar
            <ul>
              <li>
                Baz
                <ul>
                  <li>Baz2</li>
                </ul>
              </li>
              <li>
                Qux
                <ul>
                  <li>Baz3</li>
                  <li>Baz4</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Quxx</li>
        </ul>`.replace(/\s/g, ''),
      );
    });

    test('ascending and descending with nesting', () => {
      const doc = new DOMParser().parseFromString(
        `
  <!DOCTYPE html>
  <html>
  <body>
    <h2>Foo</h2>
    <div>
      <h2>Bar</h2>
      <h3>Baz</h3>
      <h3>Qux</h3>
    </div>
    <div>
      <h2>Quxx</h2>
    </div>
  </body>
  </html>`,
        'text/html',
      );
      expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
        `<ul>
          <li>Foo</li>
          <li>
            Bar
            <ul>
              <li>Baz</li>
              <li>Qux</li>
            </ul>
          </li>
          <li>Quxx</li>
        </ul>`.replace(/\s/g, ''),
      );
    });
  });

  test('ignores comment nodes', () => {
    const doc = new DOMParser().parseFromString(
      `
  <!DOCTYPE html>
  <html>
  <body>
    <h2>Foo</h2>
    <!-- Comment -->
    <div>
      <h2>Bar</h2>
      <h3>Baz<!-- Comment --></h3>
      <h3>Qux</h3>
    </div>
    <div>
      <h2>Quxx</h2>
      <!-- Comment -->
    </div>
  </body>
  </html>`,
      'text/html',
    );
    expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
      `<ul>
          <li>Foo</li>
          <li>
            Bar
            <ul>
              <li>Baz</li>
              <li>Qux</li>
            </ul>
          </li>
          <li>Quxx</li>
        </ul>`.replace(/\s/g, ''),
    );
  });

  test('ignores text nodes', () => {
    const doc = new DOMParser().parseFromString(
      `
  <!DOCTYPE html>
  <html>
  <body>
    <h2>Foo</h2>
    <div>
      Text node
      <h2>Bar</h2>
      <h3>Baz</h3>
      <h3>Qux</h3>
    </div>
    Text node
    <div>
      <h2>Quxx</h2>
      Text node
    </div>
  </body>
  </html>`,
      'text/html',
    );
    expect(tableOfContents(doc).replace(/\s/g, '')).toBe(
      `<ul>
          <li>Foo</li>
          <li>
            Bar
            <ul>
              <li>Baz</li>
              <li>Qux</li>
            </ul>
          </li>
          <li>Quxx</li>
        </ul>`.replace(/\s/g, ''),
    );
  });
});
