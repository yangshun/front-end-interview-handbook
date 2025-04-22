import { describe, expect, test } from 'vitest';

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
    expect(() => i18nMetadata({}, 'en')).toThrow();
  });

  describe('should throw if the canonical field is not an absolute URL starting with a /', () => {
    test('non-absolute URL', () => {
      expect(() =>
        i18nMetadata(
          {
            alternates: {
              canonical: 'products',
            },
          },
          'en',
        ),
      ).toThrow();
    });
  });

  describe('should generate the languages field', () => {
    test('relative URL', () => {
      expect(
        i18nMetadata(
          {
            alternates: {
              canonical: '/products',
            },
          },
          'en',
        ),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "/en/products",
            "languages": {
              "en-US": "/products",
              "pt-BR": "/pt-BR/products",
              "x-default": "/products",
              "zh-CN": "/zh-CN/products",
            },
          },
          "robots": {
            "googleBot": {
              "notranslate": true,
            },
          },
        }
      `);
    });

    test('URL string', () => {
      expect(
        i18nMetadata(
          {
            alternates: {
              canonical: 'https://example.com/products',
            },
          },
          'en',
        ),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "https://example.com/products",
            "languages": {
              "en-US": "https://example.com/products",
              "pt-BR": "https://example.com/pt-BR/products",
              "x-default": "https://example.com/products",
              "zh-CN": "https://example.com/zh-CN/products",
            },
          },
          "robots": {
            "googleBot": {
              "notranslate": true,
            },
          },
        }
      `);
    });

    test('URL object', () => {
      expect(
        i18nMetadata(
          {
            alternates: {
              canonical: new URL('https://example.com/products'),
            },
          },
          'en',
        ),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "[object Object]",
            "languages": {
              "en-US": "https://example.com/products",
              "pt-BR": "https://example.com/pt-BR/products",
              "x-default": "https://example.com/products",
              "zh-CN": "https://example.com/zh-CN/products",
            },
          },
          "robots": {
            "googleBot": {
              "notranslate": true,
            },
          },
        }
      `);
    });

    test('Alternate link descriptor', () => {
      expect(
        i18nMetadata(
          {
            alternates: {
              canonical: {
                title: 'Foo',
                url: 'https://example.com/products',
              },
            },
          },
          'en',
        ),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "https://example.com/products",
            "languages": {
              "en-US": [
                {
                  "title": "Foo",
                  "url": "/products",
                },
              ],
              "pt-BR": [
                {
                  "title": "Foo",
                  "url": "/pt-BR/products",
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
          "robots": {
            "googleBot": {
              "notranslate": true,
            },
          },
        }
      `);
    });
  });

  test('Canonical should be localized', () => {
    expect(
      i18nMetadata(
        {
          alternates: {
            canonical: '/products',
          },
        },
        'zh-CN',
      ),
    ).toMatchInlineSnapshot(`
      {
        "alternates": {
          "canonical": "/zh-CN/products",
          "languages": {
            "en-US": "/products",
            "pt-BR": "/pt-BR/products",
            "x-default": "/products",
            "zh-CN": "/zh-CN/products",
          },
        },
        "robots": {
          "googleBot": {
            "notranslate": true,
          },
        },
      }
    `);
  });

  describe('googlebot notranslate', () => {
    test('notranslate should not be added for default locale', () => {
      expect(
        i18nMetadata(
          {
            alternates: {
              canonical: '/products',
            },
            robots: {
              googleBot: {
                index: true,
              },
            },
          },
          'en',
        ),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "/en/products",
            "languages": {
              "en-US": "/products",
              "pt-BR": "/pt-BR/products",
              "x-default": "/products",
              "zh-CN": "/zh-CN/products",
            },
          },
          "robots": {
            "googleBot": {
              "index": true,
              "notranslate": true,
            },
          },
        }
      `);
    });

    test('notranslate should be added for non-default locale', () => {
      expect(
        i18nMetadata(
          {
            alternates: {
              canonical: '/products',
            },
            robots: {
              googleBot: {
                index: true,
              },
            },
          },
          'zh-CN',
        ),
      ).toMatchInlineSnapshot(`
        {
          "alternates": {
            "canonical": "/zh-CN/products",
            "languages": {
              "en-US": "/products",
              "pt-BR": "/pt-BR/products",
              "x-default": "/products",
              "zh-CN": "/zh-CN/products",
            },
          },
          "robots": {
            "googleBot": {
              "index": true,
              "notranslate": true,
            },
          },
        }
      `);
    });
  });
});
