import generateStaticParamsWithLocale from './generateStaticParamsWithLocale';

describe('generateStaticParamsWithLocale', () => {
  const params = [{ slug: 'foo' }, { slug: 'bar' }, { slug: 'qux' }];

  describe('generates static params for each locale', () => {
    test('no params', () => {
      const result = generateStaticParamsWithLocale(params);

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "locale": "en",
            "slug": "foo",
          },
          {
            "locale": "en",
            "slug": "bar",
          },
          {
            "locale": "en",
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
            "locale": "fr",
            "slug": "foo",
          },
          {
            "locale": "fr",
            "slug": "bar",
          },
          {
            "locale": "fr",
            "slug": "qux",
          },
        ]
      `);
    });

    test('one slug param', () => {
      const result = generateStaticParamsWithLocale(params);

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "locale": "en",
            "slug": "foo",
          },
          {
            "locale": "en",
            "slug": "bar",
          },
          {
            "locale": "en",
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
            "locale": "fr",
            "slug": "foo",
          },
          {
            "locale": "fr",
            "slug": "bar",
          },
          {
            "locale": "fr",
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
          "lang": "en",
          "slug": "foo",
        },
        {
          "lang": "en",
          "slug": "bar",
        },
        {
          "lang": "en",
          "slug": "qux",
        },
        {
          "lang": "zh-CN",
          "slug": "foo",
        },
        {
          "lang": "zh-CN",
          "slug": "bar",
        },
        {
          "lang": "zh-CN",
          "slug": "qux",
        },
        {
          "lang": "fr",
          "slug": "foo",
        },
        {
          "lang": "fr",
          "slug": "bar",
        },
        {
          "lang": "fr",
          "slug": "qux",
        },
      ]
    `);
  });
});
