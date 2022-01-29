module.exports = {
  title: 'Front End Interview Handbook',
  tagline:
    'Front end interview preparation materials for busy engineers - pop quizzes, coding, algorithms, front end system design and more!',
  url: 'https://www.frontendinterviewhandbook.com',
  baseUrl: '/',
  trailingSlash: true,
  favicon: 'img/favicon.png',
  organizationName: 'yangshun',
  projectName: 'front-end-interview-handbook',
  onBrokenLinks: 'ignore',
  themeConfig: {
    announcementBar: {
      id: 'announcement-2', // Increment on change
      content: `⭐️ Bring your front end interview skills to the next level with Educative. <a href="https://www.educative.io/explore?search_string=interview&skills=javascript&aff=x23W">Join today for a discount!</a> ⭐️`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Front End Interview Handbook',
      logo: {
        alt: '',
        src: 'img/logo.svg',
      },
      items: [
        {to: 'introduction', label: 'Get started', position: 'left'},
        {to: 'coding', label: 'Coding', position: 'left'},
        {
          to: 'front-end-system-design',
          label: 'System design',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/yangshun/front-end-interview-handbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-github',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://www.facebook.com/techinterviewhandbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-facebook',
          'aria-label': 'Facebook page',
        },
        {
          href: 'https://twitter.com/yangshunz',
          position: 'right',
          className: 'navbar-icon navbar-icon-twitter',
          'aria-label': 'Twitter page',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Yangshun Tay. Built with Docusaurus.`,
      links: [
        {
          title: 'General',
          items: [
            {
              label: 'Get started',
              href: '/introduction',
            },
            {
              label: 'Blog',
              href: '/blog',
            },
          ],
        },
        {
          title: 'Interviews',
          items: [
            {
              label: 'Pop quiz',
              href: '/pop-quiz',
            },
            {
              label: 'Coding round',
              href: '/coding',
            },
            {
              label: 'System design',
              href: '/front-end-system-design',
            },
            {
              label: 'Behavioral round',
              href: '/behavioral',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/yangshun/front-end-interview-handbook',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/techinterviewhandbook',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/yangshunz',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Contact us',
              href: 'mailto:business@techinterviewhandbook.org',
            },
          ],
        },
      ],
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
        gtag: {
          trackingID: 'UA-44622716-3',
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
