import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import NpmLogo from '~/components/icons/NpmLogo';

import type { ProjectsSkillRoadmap } from '../types';

export const skillsRoadmap: ProjectsSkillRoadmap = [
  {
    items: [
      {
        completed: 2,
        description:
          'HTML stands for HyperText Markup Language. It is used on the frontend and gives the structure to the webpage which you can style using CSS and make interactive using JavaScript.',
        icon: HTML5Logo,
        items: [
          {
            completed: 4,
            key: 'html-basics',
            points: 20,
            total: 4,
          },
          {
            completed: 2,
            key: 'html-semantics',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'html-forms',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'html-a11y',
            points: 20,
            total: 4,
          },
        ],
        key: 'html',
        points: 100,
        total: 4,
      },
      {
        completed: 4,
        description:
          'Programming language and core technology of the World Wide Web, alongside HTML and CSS. In 2023, 98.7% of web use JavaScript on the client side for webpage behavior, also as third-party libraries.',
        icon: JavaScriptLogo,
        items: [
          {
            completed: 4,
            key: 'js-foundations',
            points: 20,
            total: 4,
          },
          {
            completed: 2,
            key: 'js-browser-dom',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'js-fetch',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'js-web-storage',
            points: 20,
            total: 4,
          },
        ],
        key: 'javascript',
        points: 20,
        total: 4,
      },
      {
        completed: 2,
        description:
          'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML.',
        icon: CSS3Logo,
        items: [
          {
            completed: 4,
            key: 'css-basics',
            points: 20,
            total: 4,
          },
          {
            completed: 2,
            key: 'css-layout',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'css-flex',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'css-grid',
            points: 20,
            total: 4,
          },
        ],
        key: 'css',
        points: 100,
        total: 4,
      },
    ],
    title: 'Foundational skills',
  },
  {
    items: [
      {
        completed: 2,
        description:
          "Is a collection of software tools that automates the process of installing, upgrading, configuring, and removing software packages for a computer's operating system in a consistent manner.",
        icon: NpmLogo,
        items: [
          {
            completed: 4,
            key: 'npm',
            points: 20,
            total: 4,
          },
          {
            completed: 2,
            key: 'yarn',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'pnpm',
            points: 20,
            total: 4,
          },
        ],
        key: 'package-managers',
        points: 100,
        total: 4,
      },
      {
        completed: 4,
        description:
          'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML.',
        icon: HTML5Logo,
        items: [
          {
            completed: 4,
            key: 'css-preprocessors',
            points: 20,
            total: 4,
          },
          {
            completed: 2,
            key: 'css-architecture',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'css-modern',
            points: 20,
            total: 4,
          },
          {
            completed: 0,
            key: 'css-frameworks',
            points: 20,
            total: 4,
          },
        ],
        key: 'css-advanced',
        points: 20,
        total: 4,
      },
    ],
    title: 'Intermediate skills',
  },
];
