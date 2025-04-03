import { ConfigType } from 'langnostic';

const config: ConfigType = {
  provider: 'google',
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
    // {
    //   "name": "quiz",
    //   "plugin": [
    //     "mdx",
    //     {
    //       "frontmatterExcludedKeys": ["author", "published"]
    //     }
    //   ],
    //   "paths": [
    //     {
    //       "source": "./src/quiz/**/en-US.mdx",
    //       "target": "./src/quiz/**/{locale}.mdx"
    //     }
    //   ]
    // }
  ],
};

export default config;
