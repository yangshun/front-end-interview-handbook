import { describe, expect, it, test } from 'vitest';

import generateStaticParamsWithLocale from './generateStaticParamsWithLocale';

describe('generateStaticParamsWithLocale', () => {
  const params = [{ slug: 'foo' }, { slug: 'bar' }, { slug: 'qux' }];

  describe('generates static params for each locale', () => {
    test('no params', () => {
      const result = generateStaticParamsWithLocale(params, false);

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "locale": "en-US",
            "slug": "foo",
          },
          {
            "locale": "en-US",
            "slug": "bar",
          },
          {
            "locale": "en-US",
            "slug": "qux",
          },
          {
            "locale": "zh-CN",
            "slug": "foo",
          },
          {
            "locale": "zh-CN",
            "slug": "bar",
          },
          {
            "locale": "zh-CN",
            "slug": "qux",
          },
          {
            "locale": "pt-BR",
            "slug": "foo",
          },
          {
            "locale": "pt-BR",
            "slug": "bar",
          },
          {
            "locale": "pt-BR",
            "slug": "qux",
          },
        ]
      `);
    });

    test('one slug param', () => {
      const result = generateStaticParamsWithLocale(params, false);

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "locale": "en-US",
            "slug": "foo",
          },
          {
            "locale": "en-US",
            "slug": "bar",
          },
          {
            "locale": "en-US",
            "slug": "qux",
          },
          {
            "locale": "zh-CN",
            "slug": "foo",
          },
          {
            "locale": "zh-CN",
            "slug": "bar",
          },
          {
            "locale": "zh-CN",
            "slug": "qux",
          },
          {
            "locale": "pt-BR",
            "slug": "foo",
          },
          {
            "locale": "pt-BR",
            "slug": "bar",
          },
          {
            "locale": "pt-BR",
            "slug": "qux",
          },
        ]
      `);
    });
  });

  it('accepts a custom parameter name', () => {
    const result = generateStaticParamsWithLocale(params, true, 'lang');

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "lang": "en-US",
          "slug": "foo",
        },
        {
          "lang": "en-US",
          "slug": "bar",
        },
        {
          "lang": "en-US",
          "slug": "qux",
        },
      ]
    `);
  });
});
