module.exports = {
  title: 'Front End Interview Handbook',
  tagline:
    'Front End interview preparation materials for busy engineers - pop quizzes, coding, front end system design and more!',
  url: 'https://frontendinterviewhandbook.com',
  baseUrl: '/',
  trailingSlash: true,
  favicon: 'img/favicon.png',
  organizationName: 'yangshun',
  projectName: 'front-end-interview-handbook',
  onBrokenLinks: 'ignore',
  themeConfig: {
    announcementBar: {
      id: 'announcement-1', // Increment on change
      content: `⭐️ Front End Interview Handbook now includes content on coding questions and system design questions!⭐️`,
    },
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
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {to: 'blog', label: 'Blog', position: 'right'},
        {
          href: 'https://github.com/yangshun/front-end-interview-handbook',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://twitter.com/yangshunz',
          label: 'Twitter',
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
      apiKey: '6c13c369e8d9809cebb5c51330c914c3',
      indexName: 'frontendinterviewhandbook',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../contents',
          routeBasePath: '/',
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
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/css-questions',
            from: '/en/css-questions',
          },
          {
            to: '/html-questions',
            from: '/en/html-questions',
          },
          {
            to: '/javascript-questions',
            from: '/en/javascript-questions',
          },
        ],
      },
    ],
  ],
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4984084888641317',
      crossorigin: 'anonymous',
      async: true,
    },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'es', 'jp', 'kr', 'pl', 'pr', 'ru', 'tl'],
    localeConfigs: {
      zh: {
        label: '简体中文',
        direction: 'ltr',
      },
      es: {
        label: 'Español',
        direction: 'ltr',
      },
      jp: {
        label: '日本語',
        direction: 'ltr',
      },
      kr: {
        label: '한국어',
        direction: 'ltr',
      },
      pl: {
        label: 'Polski',
        direction: 'ltr',
      },
      pr: {
        label: 'Português',
        direction: 'ltr',
      },
      ru: {
        label: 'Русский',
        direction: 'ltr',
      },
      tl: {
        label: 'Tagalog',
        direction: 'ltr',
      },
    },
  },
};
