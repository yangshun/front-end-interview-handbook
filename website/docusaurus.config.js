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
      id: 'educative', // Increment on change
      content: `⭐️ Level up your front end interviewing skills with Educative. <a href="https://www.educative.io/explore?search_string=interview&skills=javascript&aff=x23W">Join today for a discount!</a> ⭐️`,
      isCloseable: false,
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
        {to: 'introduction', label: 'Start reading', position: 'left'},
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
              href: '/introduction/',
            },
            {
              label: 'Pop quiz',
              href: '/pop-quiz/',
            },
            {
              label: 'Behavioral round',
              href: '/behavioral/',
            },
            {
              label: 'Blog',
              href: '/blog/',
            },
          ],
        },
        {
          title: 'Coding',
          items: [
            {
              label: 'Algorithms',
              href: '/coding/algorithms/',
            },
            {
              label: 'Utility function',
              href: '/coding/utility-function/',
            },
            {
              label: 'User interfaces',
              href: '/coding/build-user-interfaces/',
            },
          ],
        },
        {
          title: 'System design',
          items: [
            {
              label: 'System design overview',
              href: '/front-end-system-design/',
            },
            {
              label: 'UI components',
              href: '/front-end-system-design/ui-components/',
            },
            {
              label: 'Applications',
              href: '/front-end-system-design/applications/',
            },
          ],
        },
        {
          title: 'More',
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
            {
              label: 'Contact us',
              href: 'mailto:contact@techinterviewhandbook.org',
            },
          ],
        },
      ],
    },
    algolia: {
      appId: '21T5PEFGI7',
      apiKey: '10d7777b44bc7e0495cc00e860918b03',
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
          trackingID: 'G-D9B6CHX36V',
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        id: 'universal-analytics',
        trackingID: 'UA-44622716-3',
        anonymizeIP: true,
      },
    ],
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
  scripts: [],
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
