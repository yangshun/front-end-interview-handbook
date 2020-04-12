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
          label: 'Contents',
          to: '', // "fake" link
          position: 'right',
          items: [
            {
              label: 'English',
              to: 'en/questions/html-questions',
            },
            {
              label: '简体中文',
              to: 'zh/questions/html-questions',
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
    // gtag: {
    //   trackingID: "UA-44622716-2",
    // },
    // algolia: {
    //   apiKey: "bd359779d1c4c71ade6062e8f13f5a83",
    //   indexName: "yangshun-tech-interview",
    // },
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
