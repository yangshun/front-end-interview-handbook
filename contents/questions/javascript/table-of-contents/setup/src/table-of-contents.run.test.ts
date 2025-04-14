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

  test('nested', () => {
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
});
