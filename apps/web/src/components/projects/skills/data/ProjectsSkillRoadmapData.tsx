import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import NpmLogo from '~/components/icons/NpmLogo';

import type { ProjectsSkillRoadmapConfig } from '../types';

export const skillsRoadmap: ProjectsSkillRoadmapConfig = [
  {
    items: [
      {
        description:
          'HTML stands for HyperText Markup Language. It is used on the frontend and gives the structure to the webpage which you can style using CSS and make interactive using JavaScript.',
        icon: HTML5Logo,
        items: ['html-basics', 'html-semantics', 'html-forms', 'html-a11y'],
        key: 'html',
        tagClassname:
          'bg-orange-600 text-white dark:bg-neutral-700 dark:text-orange-600',
      },
      {
        description:
          'Programming language and core technology of the World Wide Web, alongside HTML and CSS. In 2023, 98.7% of web use JavaScript on the client side for webpage behavior, also as third-party libraries.',
        icon: JavaScriptLogo,
        items: [
          'javascript-browser-dom',
          'javascript-fetch',
          'javascript-web-storage',
        ],
        key: 'javascript',
        tagClassname:
          'bg-yellow-500 text-black dark:bg-neutral-700 dark:text-yellow-500',
      },
      {
        description:
          'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML.',
        icon: CSS3Logo,
        items: ['css-layout', 'css-flex', 'css-grid'],
        key: 'css',
        tagClassname:
          'bg-sky-500 text-white dark:bg-neutral-700 dark:text-sky-500',
      },
    ],
    title: 'Foundational skills',
  },
  {
    items: [
      {
        description:
          "Is a collection of software tools that automates the process of installing, upgrading, configuring, and removing software packages for a computer's operating system in a consistent manner.",
        icon: NpmLogo,
        items: ['npm', 'yarn', 'pnpm'],
        key: 'package-managers',
        tagClassname: 'bg-red text-white dark:bg-neutral-700 dark:text-red',
      },
      {
        description:
          'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML.',
        icon: HTML5Logo,
        items: [
          'css-preprocessors',
          'css-architecture',
          'css-modern',
          'css-frameworks',
        ],
        key: 'css-advanced',
        tagClassname:
          'bg-green-dark text-white dark:bg-neutral-700 dark:text-green',
      },
    ],
    title: 'Intermediate skills',
  },
];
