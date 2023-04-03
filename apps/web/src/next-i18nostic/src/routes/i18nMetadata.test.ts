import i18nMetadata, { parseCanonical } from './i18nMetadata';

describe('parseCanonical', () => {
  test('URL object input', () => {
    expect(parseCanonical(new URL('https://www.example.com/about'))).toEqual({
      canonical: new URL('https://www.example.com/about'),
      pathname: '/about',
      type: 'url',
    });
  });

  test('full URL string input', () => {
    expect(parseCanonical('https://www.example.com/about')).toEqual({
      canonical: 'https://www.example.com/about',
      pathname: '/about',
      type: 'url_string',
    });
  });

  test('relative pathname input', () => {
    expect(parseCanonical('/about')).toEqual({
      canonical: '/about',
      pathname: '/about',
      type: 'relative_pathname',
    });
  });

  test('relative pathname input with query parameters', () => {
    expect(parseCanonical('/about?param=value')).toEqual({
      canonical: '/about?param=value',
      pathname: '/about?param=value',
      type: 'relative_pathname',
    });
  });

  test('invalid URL string input', () => {
    expect(parseCanonical('invalid-url')).toEqual({
      canonical: 'invalid-url',
      pathname: 'invalid-url',
      type: 'relative_pathname',
    });
  });
});

describe('i18nMetadata', () => {
  test('throws if canonical is not provided', () => {
    expect(() => i18nMetadata({})).toThrow();
  });

  describe('should throw if the canonical field is not an absolute URL starting with a /', () => {
    test('non-absolute URL', () => {
      expect(() =>
        i18nMetadata({
          alternates: {
            canonical: 'products',
          },
        }),
      ).toThrow();
    });
  });

  describe('should generate the languages field', () => {
    test('relative URL', () => {
      expect(
        i18nMetadata({
          alternates: {
            canonical: '/products',
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "/products",
            "languages": {
              "en-US": "/products",
              "fr-FR": "/fr/products",
              "x-default": "/products",
              "zh-CN": "/zh-CN/products",
            },
          },
        }
      `);
    });

    test('URL string', () => {
      expect(
        i18nMetadata({
          alternates: {
            canonical: 'https://example.com/products',
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "https://example.com/products",
            "languages": {
              "en-US": "https://example.com/products",
              "fr-FR": "https://example.com/fr/products",
              "x-default": "https://example.com/products",
              "zh-CN": "https://example.com/zh-CN/products",
            },
          },
        }
      `);
    });

    test('URL object', () => {
      expect(
        i18nMetadata({
          alternates: {
            canonical: new URL('https://example.com/products'),
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "https://example.com/products",
            "languages": {
              "en-US": "https://example.com/products",
              "fr-FR": "https://example.com/fr/products",
              "x-default": "https://example.com/products",
              "zh-CN": "https://example.com/zh-CN/products",
            },
          },
        }
      `);
    });

    test('Alternate link descriptor', () => {
      expect(
        i18nMetadata({
          alternates: {
            canonical: {
              title: 'Foo',
              url: 'https://example.com/products',
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": {
              "title": "Foo",
              "url": "https://example.com/products",
            },
            "languages": {
              "en-US": [
                {
                  "title": "Foo",
                  "url": "/products",
                },
              ],
              "fr-FR": [
                {
                  "title": "Foo",
                  "url": "/fr/products",
                },
              ],
              "x-default": [
                {
                  "title": "Foo",
                  "url": "/products",
                },
              ],
              "zh-CN": [
                {
                  "title": "Foo",
                  "url": "/zh-CN/products",
                },
              ],
            },
          },
        }
      `);
    });
  });
});
