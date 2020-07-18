module.exports = {
  title: 'Front End Interview Handbook',
  tagline:
    'Almost complete answers to "Front-end Job Interview Questions" which you can use to interview potential candidates, test yourself or completely ignore',
  url: 'https://yangshun.github.io',
  baseUrl: '/front-end-interview-handbook/',
  favicon: 'img/favicon.png',
  organizationName: 'yangshun',
  projectName: 'front-end-interview-handbook',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Front End Interview Handbook',
      logo: {
        alt: 'Front End Interview Handbook Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          label: 'Translations',
          to: '', // "fake" link
          position: 'right',
          items: [
            {
              label: 'English',
              to: 'en/html-questions',
              activeBasePath: 'en',
            },
            {
              label: '简体中文',
              to: 'zh/html-questions',
              activeBasePath: 'zh',
            },
            {
              label: 'Español',
              to: 'es/html-questions',
              activeBasePath: 'es',
            },
            {
              label: '日本語',
              to: 'jp/html-questions',
              activeBasePath: 'jp',
            },
            {
              label: '한국어',
              to: 'kr/html-questions',
              activeBasePath: 'kr',
            },
            {
              label: 'Polski',
              to: 'pl/html-questions',
              activeBasePath: 'pl',
            },
            {
              label: 'Português',
              to: 'pr/html-questions',
              activeBasePath: 'pr',
            },
            {
              label: 'Русский',
              to: 'ru/html-questions',
              activeBasePath: 'ru',
            },
            {
              label: 'Tagalog',
              to: 'tl/html-questions',
              activeBasePath: 'tl',
            },
          ],
        },
        {
          href: 'https://github.com/yangshun/front-end-interview-handbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Yangshun Tay. Built with Docusaurus.`,
    },
    gtag: {
      trackingID: 'UA-44622716-3',
    },
    algolia: {
      apiKey: '92f9396569357020046ad53446dc06e3',
      indexName: 'front-end-interview-handbook',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../contents',
          routeBasePath: '',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/yangshun/front-end-interview-handbook/edit/master/contents/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
