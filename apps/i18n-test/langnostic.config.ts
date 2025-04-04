import { ConfigType } from 'langnostic';

export default {
  ai: {
    provider: 'google',
  },
  localeConfig: {
    source: 'en-US',
    target: ['zh-CN', 'pt-BR'],
  },
  groups: [
    {
      name: 'app',
      plugin: 'json',
      paths: [
        {
          source: './src/locales/en-US.json',
          target: './src/locales/{locale}.json',
        },
      ],
    },
    {
      name: 'quiz',
      plugin: [
        'mdx',
        {
          frontmatterExcludedKeys: ['author', 'published'],
        },
      ],
      paths: [
        {
          source: './src/quiz/*/en-US.mdx',
          target: './src/quiz/*/{locale}.mdx',
        },
      ],
    },
    // {
    //   "name": "blog",
    //   "plugin": "mdx",
    //   "paths": [
    //     {
    //       "source": "./src/locales/en-US.mdx",
    //       "target": "./src/locales/{locale}.mdx"
    //     }
    //   ]
    // },
  ],
} satisfies ConfigType;
