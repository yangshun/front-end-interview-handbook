module.exports = {
  root: [
    'introduction',
    {
      type: 'category',
      label: 'Pop quiz',
      items: [
        'pop-quiz',
        'html-questions',
        'css-questions',
        'javascript-questions',
      ],
    },
    {
      type: 'category',
      label: 'Coding round',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Coding round',
        description: 'Various type of front end coding interview!',
        slug: '/coding',
      },
      items: ['algorithms', 'utility-function', 'build-user-interfaces'],
    },
    {
      type: 'category',
      label: 'System design',
      collapsed: false,
      items: [
        'front-end-system-design',
        'front-end-system-design-ui-components',
        'front-end-system-design-applications',
      ],
    },
    'behavioral',
    'resume',
    {
      type: 'category',
      label: 'Interview questions 🔥',
      collapsed: false,
      items: [
        'companies/google-front-end-interview-questions',
        'companies/microsoft-front-end-interview-questions',
        'companies/amazon-front-end-interview-questions',
        'companies/apple-front-end-interview-questions',
        'companies/airbnb-front-end-interview-questions',
        'companies/bytedance-tiktok-front-end-interview-questions',
        'companies/dropbox-front-end-interview-questions',
        'companies/linkedin-front-end-interview-questions',
        'companies/lyft-front-end-interview-questions',
        'companies/salesforce-front-end-interview-questions',
        'companies/twitter-front-end-interview-questions',
        'companies/uber-front-end-interview-questions',
      ],
    },
  ],
};
