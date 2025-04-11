import type { ConfigType } from 'langnostic';

export default {
  ai: {
    provider: 'google',
  },
  groups: [
    {
      name: 'app',
      paths: [
        {
          source: './src/locales/raw/en-US.json',
          target: './src/locales/raw/{locale}.json',
        },
      ],
      plugin: 'json',
    },
    {
      name: 'interviews-study-list',
      paths: [
        {
          source: './src/content/interviews/study-list/**/en-US.mdx',
          target: './src/content/interviews/study-list/**/{locale}.mdx',
        },
      ],
      plugin: [
        'mdx',
        {
          frontmatterExcludedKeys: [
            'access',
            'customHref',
            'logoUrl',
            'questionHashes',
            'ranking',
            'schedule',
            'topics',
          ],
        },
      ],
    },
  ],
  localeConfig: {
    source: 'en-US',
    target: ['zh-CN'],
  },
} satisfies ConfigType;
