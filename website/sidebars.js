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
      link: {
        type: 'generated-index',
        title: 'Coding round',
        description: 'Various type of front end coding interview!',
        slug: '/coding',
      },
      items: ['utility-function', 'build-user-interfaces', 'algorithms'],
    },
    {
      type: 'category',
      label: 'System design',
      items: [
        'front-end-system-design',
        'front-end-system-design-ui-components',
        'front-end-system-design-applications',
      ],
    },
    'behavioral',
  ],
};
