import type { ConfigType } from './types';

export const configDefault: ConfigType = {
  ai: {
    provider: 'openai',
  },
  groups: [
    {
      name: 'app-strings',
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
