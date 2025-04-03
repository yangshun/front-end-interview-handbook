import type { ConfigType } from 'langnostic';

const config: ConfigType = {
  ai: {
    provider: 'google',
  },
  groups: [
    {
      name: 'app',
      paths: [
        {
          source: './src/locales/en-US.json',
          target: './src/locales/{locale}.json',
        },
      ],
      plugin: 'json',
    },
  ],
  localeConfig: {
    source: 'en-US',
    target: ['zh-CN'],
  },
};

export default config;
