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
      name: 'blog',
      plugin: 'mdx',
      paths: [
        {
          source: './src/blog/**/en-US.mdx',
          target: './src/blog/**/{locale}.mdx',
        },
      ],
    },
    {
      name: 'questions',
      plugin: 'mdx',
      paths: [
        {
          source: './src/questions/*/writeups/en-US/**/*.mdx',
          target: './src/questions/*/writeups/{locale}/**/*.mdx',
        },
      ],
    },
  ],
} satisfies ConfigType;
