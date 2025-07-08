const { themes } = require('prism-react-renderer');

module.exports = {
  title: 'The Official Front End Interview Handbook 2025',
  tagline:
    'Front end interview preparation resources for busy engineers – quiz questions, JavaScript coding questions, algorithms questions, front end system design questions and more. Updated for 2025!',
  url: 'https://www.frontendinterviewhandbook.com',
  baseUrl: '/',
  trailingSlash: false,
  favicon: 'img/favicon.png',
  organizationName: 'yangshun',
  projectName: 'front-end-interview-handbook',
  onBrokenLinks: 'ignore',
  themeConfig: {
    announcementBar: {
      id: 'gfe', // Increment on change
      content: `We are now part of <a href="https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=banner&gnrs=frontendinterviewhandbook" target="_blank">GreatFrontEnd</a>, a front end interview preparation platform created by ex-Meta and Google Engineers. <a href="https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=banner&gnrs=frontendinterviewhandbook" target="_blank">Get 20% off today</a>!`,
      isCloseable: false,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
    navbar: {
      title: 'Front End Interview Handbook',
      logo: {
        alt: '',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'introduction', label: 'Start reading', position: 'left' },
        {
          type: 'dropdown',
          position: 'left',
          label: 'Practice',
          items: [
            {
              label: 'Coding Questions',
              href: 'https://www.greatfrontend.com/questions?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=banner&gnrs=frontendinterviewhandbook',
            },
            {
              label: 'System Design',
              href: 'https://www.greatfrontend.com/questions/system-design?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=banner&gnrs=frontendinterviewhandbook',
            },
            {
              label: 'Quiz Questions',
              href: 'https://www.greatfrontend.com/questions/quiz?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=banner&gnrs=frontendinterviewhandbook',
            },
          ],
        },
        {
          to: 'front-end-system-design',
          label: 'System design',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/yangshun/front-end-interview-handbook',
          position: 'right',
          className: 'navbar-icon navbar-icon-github',
          'aria-label': 'GitHub repository',
          html: `<svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 496 512"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>`,
        },
        {
          href: 'https://discord.gg/NDFx8f6P6B',
          position: 'right',
          className: 'navbar-icon navbar-icon-discord',
          'aria-label': 'Discord channel',
          html: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg>`,
        },
        {
          href: 'https://x.com/greatfrontend',
          position: 'right',
          className: 'navbar-icon navbar-icon-twitter',
          'aria-label': 'Twitter page',
          html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="16" height="16" fill="currentColor" version="1.1"><path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/></svg>`,
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Yangshun Tay and GreatFrontEnd`,
      links: [
        {
          title: 'General',
          items: [
            {
              label: 'Get started',
              href: '/introduction/',
            },
            {
              label: 'Trivia questions',
              href: '/trivia/',
            },
            {
              label: 'Company questions',
              href: '/company-interview-questions/',
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
              label: 'JavaScript utility functions',
              href: '/coding/javascript-utility-function/',
            },
            {
              label: 'User interfaces',
              href: '/coding/build-front-end-user-interfaces/',
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
              label: 'User interface components',
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
              label: 'GreatFrontEnd',
              href: 'https://www.greatfrontend.com?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=banner&gnrs=frontendinterviewhandbook',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/yangshun/front-end-interview-handbook',
            },
            {
              label: 'X',
              href: 'https://x.com/greatfrontend',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/NDFx8f6P6B',
            },
            {
              label: 'Contact us',
              href: 'mailto:contact@greatfrontend.com',
            },
            {
              label: 'Tech Interview Handbook',
              href: 'https://www.techinterviewhandbook.org',
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
    docs: {
      sidebar: {
        hideable: true,
      },
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
            'https://github.com/yangshun/front-end-interview-handbook/edit/main/contents/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-D9B6CHX36V',
        },
        sitemap: {
          ignorePatterns: ['/blog/**'],
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
    locales: [
      'en',
      'zh-CN',
      'es',
      'ja-JP',
      'kr',
      'pl',
      'pt-BR',
      'ru',
      'tl',
      'bn',
    ],
    localeConfigs: {
      'zh-CN': {
        htmlLang: 'zh-CN',
        label: '简体中文',
        direction: 'ltr',
      },
      es: {
        label: 'Español',
        direction: 'ltr',
      },
      'ja-JP': {
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
      'pt-BR': {
        htmlLang: 'pt-BR',
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
      bn: {
        label: 'বাংলা',
        direction: 'ltr',
      },
    },
  },
};
