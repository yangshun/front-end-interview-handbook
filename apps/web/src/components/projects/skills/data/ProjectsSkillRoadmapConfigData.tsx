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
        premium: false,
        tagClassname:
          'bg-sky-500 text-white dark:bg-neutral-700 dark:text-sky-500',
        title: 'CSS',
      },
      {
        items: [
          { key: 'javascript-events', label: 'DOM Events' },
          { key: 'javascript-dom-manipulation', label: 'DOM Manipulation' },
          { key: 'javascript-fetch', label: 'Fetch' },
          { key: 'javascript-storage', label: 'Storage' },
        ],
        key: 'javascript',
        premium: false,
        tagClassname:
          'bg-yellow-500 text-black dark:bg-neutral-700 dark:text-yellow-500',
        title: 'JavaScript',
      },
    ],
    title: 'Foundational skills',
  },
  {
    items: [
      {
        items: [
          { key: 'react-basics', label: 'Basics' },
          { key: 'react-components', label: 'Components' },
          { key: 'react-list', label: 'List Rendering' },
          { key: 'react-event', label: 'Event Handling' },
          { key: 'react-form', label: 'Form Handling' },
          { key: 'react-effects', label: 'Effects' },
        ],
        key: 'react',
        premium: true,
        tagClassname:
          'bg-cyan-500 text-black dark:bg-neutral-700 dark:text-cyan-500',
        title: 'React',
      },
      {
        items: [
          { key: 'package-manager-basics', label: 'Basics' },
          { key: 'package-manager-workspaces', label: 'Workspaces' },
        ],
        key: 'package-managers',
        premium: true,
        tagClassname:
          'bg-red-500 text-black dark:bg-neutral-700 dark:text-red-500',
        title: 'Package Managers',
      },
      {
        items: [
          { key: 'build-typechecking', label: 'Typechecking' },
          { key: 'build-linting-formatting', label: 'Linting & Formatting' },
          { key: 'build-bundling', label: 'Bundling' },
        ],
        key: 'build-tools',
        premium: true,
        tagClassname:
          'bg-cyan-500 text-black dark:bg-neutral-700 dark:text-cyan-500',
        title: 'Build Tools',
      },
    ],
    title: 'Intermediate skills',
  },
  {
    items: [
      {
        items: [
          { key: 'testing-unit', label: 'Unit Tests' },
          { key: 'testing-e2e', label: 'End-to-end Tests' },
        ],
        key: 'testing',
        premium: true,
        tagClassname:
          'bg-red-500 text-black dark:bg-neutral-700 dark:text-red-500',
        title: 'Testing',
      },
      {
        items: [
          { key: 'performance-fonts', label: 'Font Loading' },
          { key: 'performance-images', label: 'Image Loading' },
          { key: 'performance-code', label: 'Code Loading' },
        ],
        key: 'performance',
        premium: true,
        tagClassname:
          'bg-red-500 text-black dark:bg-neutral-700 dark:text-red-500',
        title: 'Performance',
      },
    ],
    title: 'Advanced skills',
  },
] as const;
