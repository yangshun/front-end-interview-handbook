export const skillsRoadmapConfig = [
  {
    items: [
      {
        items: [
          { key: 'html-basics', label: 'Basics' },
          { key: 'html-semantics', label: 'Semantics' },
          { key: 'html-images', label: 'Images' },
          { key: 'html-forms', label: 'Forms' },
        ],
        key: 'html',
        premium: false,
        tagClassname:
          'bg-orange-600 text-white dark:bg-neutral-700 dark:text-orange-600',
        title: 'HTML',
      },
      {
        items: [
          { key: 'css-basics', label: 'Basics' },
          { key: 'css-positioning', label: 'Positioning' },
          { key: 'css-layout', label: 'Layout' },
          { key: 'css-responsive-design', label: 'Responsive Design' },
          {
            key: 'css-transforms-transitions',
            label: 'Transforms and Transitions',
          },
          { key: 'css-architecture', label: 'Architecture' },
        ],
        key: 'css',
        premium: true,
        tagClassname:
          'bg-sky-500 text-white dark:bg-neutral-700 dark:text-sky-500',
        title: 'CSS',
      },
      {
        items: [
          { key: 'javascript-events', label: 'DOM events' },
          { key: 'javascript-dom-manipulation', label: 'DOM manipulation' },
          { key: 'javascript-fetch', label: 'Fetch' },
          { key: 'javascript-storage', label: 'Storage' },
        ],
        key: 'javascript',
        premium: true,
        tagClassname:
          'bg-yellow-500 text-black dark:bg-neutral-700 dark:text-yellow-500',
        title: 'JavaScript',
      },
    ],
    title: 'Foundational skills',
  },
] as const;
