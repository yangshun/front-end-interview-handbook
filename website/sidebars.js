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
  ],
};
