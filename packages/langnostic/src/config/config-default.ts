import { ConfigType } from './types';

export const configDefault: ConfigType = {
  provider: 'openai',
  localeConfig: {
    source: 'en-US',
    target: ['zh-CN'],
  },
  groups: [
    {
      name: 'app-strings',
      plugin: 'json',
      paths: [
        {
          source: './src/locales/en-US.json',
          target: './src/locales/{locale}.json',
        },
      ],
    },
  ],
};
