import { ConfigType } from 'langnostic';

const config: ConfigType = {
  ai: {
    provider: 'google',
  },
  localeConfig: {
    source: 'en-US',
    target: ['zh-CN'],
  },
  groups: [
    {
      name: 'quiz',
      plugin: 'mdx',
      paths: [
        {
          source: './packages/quiz/**/en-US.mdx',
          target: './packages/quiz/**/{locale}.mdx',
        },
      ],
    },
    {
      name: 'guidebooks',
      plugin: 'mdx',
      paths: [
        {
          source: './packages/behavioral-interview-guidebook/**/en-US.mdx',
          target: './packages/behavioral-interview-guidebook/**/{locale}.mdx',
        },
        {
          source: './packages/front-end-interview-guidebook/**/en-US.mdx',
          target: './packages/front-end-interview-guidebook/**/{locale}.mdx',
        },
        {
          source: './packages/react-interview-playbook/**/en-US.mdx',
          target: './packages/react-interview-playbook/**/{locale}.mdx',
        },
        {
          source: './packages/system-design/**/en-US.mdx',
          target: './packages/system-design/**/{locale}.mdx',
        },
      ],
    },
  ],
};

export default config;
