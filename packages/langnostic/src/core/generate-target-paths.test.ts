import { generateTargetPaths } from '.';

describe('generateTargetPaths', () => {
  test('same output directory', () => {
    expect(
      generateTargetPaths(
        'blog/**/en-US.mdx',
        'blog/**/{locale}.mdx',
        'blog/foobar/en-US.mdx',
        ['zh-CN', 'ja-JP'],
      ),
    ).toMatchInlineSnapshot(`
    [
      {
        "locale": "zh-CN",
        "path": "blog/foobar/zh-CN.mdx",
      },
      {
        "locale": "ja-JP",
        "path": "blog/foobar/ja-JP.mdx",
      },
    ]
  `);
  });

  test('different directory', () => {
    expect(
      generateTargetPaths(
        'blog/**/en-US.mdx',
        'external/**/{locale}.mdx',
        'blog/foobar/en-US.mdx',
        ['zh-CN', 'ja-JP'],
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "locale": "zh-CN",
          "path": "external/foobar/zh-CN.mdx",
        },
        {
          "locale": "ja-JP",
          "path": "external/foobar/ja-JP.mdx",
        },
      ]
    `);
  });

  test('locale as directory', () => {
    expect(
      generateTargetPaths(
        'blog/**/en-US/index.mdx',
        'blog/**/{locale}/index.mdx',
        'blog/foobar/en-US/index.mdx',
        ['zh-CN', 'ja-JP'],
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "locale": "zh-CN",
          "path": "blog/foobar/zh-CN/index.mdx",
        },
        {
          "locale": "ja-JP",
          "path": "blog/foobar/ja-JP/index.mdx",
        },
      ]
    `);
  });

  test('wildcard files', () => {
    expect(
      generateTargetPaths(
        'blog/**/en-US/*.mdx',
        'external/**/{locale}/*.mdx',
        'blog/foo/bar/en-US/post.mdx',
        ['zh-CN', 'ja-JP'],
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "locale": "zh-CN",
          "path": "external/foo/bar/zh-CN/post.mdx",
        },
        {
          "locale": "ja-JP",
          "path": "external/foo/bar/ja-JP/post.mdx",
        },
      ]
    `);
    expect(
      generateTargetPaths(
        'questions/*/writeups/en-US/**/*.mdx',
        'questions/*/writeups/{locale}/**/*.mdx',
        'questions/accordion/writeups/en-US/index.mdx',
        ['zh-CN', 'ja-JP'],
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "locale": "zh-CN",
          "path": "questions/accordion/writeups/zh-CN/index.mdx",
        },
        {
          "locale": "ja-JP",
          "path": "questions/accordion/writeups/ja-JP/index.mdx",
        },
      ]
    `);
    expect(
      generateTargetPaths(
        'questions/*/writeups/en-US/**/*.mdx',
        'questions/*/writeups/{locale}/**/*.mdx',
        'questions/accordion/writeups/en-US/skeleton/index.mdx',
        ['zh-CN', 'ja-JP'],
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "locale": "zh-CN",
          "path": "questions/accordion/writeups/zh-CN/skeleton/index.mdx",
        },
        {
          "locale": "ja-JP",
          "path": "questions/accordion/writeups/ja-JP/skeleton/index.mdx",
        },
      ]
    `);
  });
});
