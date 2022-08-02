module.exports = {
  root: [
    'introduction',
    {
      type: 'category',
      label: 'Trivia questions',
      items: [
        'trivia',
        'javascript-questions',
        'css-questions',
        'html-questions',
      ],
    },
    {
      type: 'category',
      label: 'Coding interview',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Coding round',
        description:
          'Various type of coding questions for front end interviews!',
        slug: '/coding',
      },
      items: [
        'javascript-utility-function',
        'build-front-end-user-interfaces',
        'algorithms',
      ],
    },
    {
      type: 'category',
      label: 'System design interview',
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
      link: {
        type: 'generated-index',
        title: 'Company interview questions',
        slug: '/company-interview-questions',
      },
      items: [
        'companies/google-front-end-interview-questions',
        'companies/amazon-front-end-interview-questions',
        'companies/microsoft-front-end-interview-questions',
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
