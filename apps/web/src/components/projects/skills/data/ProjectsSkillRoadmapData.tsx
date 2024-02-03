import type { ProjectSkillTree } from '../types';

export const foundationalSkillTree: ProjectSkillTree = [
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'semantic',
        label: 'Semantic',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'forms',
        label: 'Forms',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'a11y',
        label: 'A11y',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'html',
    label: 'HTML',
    totalProjectCount: 11,
    type: 'group',
  },

  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'layout',
        label: 'Layout',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'flex',
        label: 'Flex',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'grid',
        label: 'Grid',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'css',
    label: 'CSS',
    totalProjectCount: 11,
    type: 'group',
  },
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'dom',
        label: 'DOM',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'fetch',
        label: 'Fetch',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'storage',
        label: 'Storage',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'javascript',
    label: 'JavaScript',
    totalProjectCount: 11,
    type: 'group',
  },
];

export const intermediateSkillTree: ProjectSkillTree = [
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'placeholder-item-1',
        label: 'Placeholder',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'placeholder-group-1',
    label: 'Placeholder',
    totalProjectCount: 11,
    type: 'group',
  },
];

export const foundationalSkills = [
  {
    childSkills: [
      {
        completedChallenges: 4,
        points: 20,
        title: 'Basics',
        totalChallenges: 4,
      },
      {
        completedChallenges: 2,
        points: 20,
        title: 'Semantics',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'Forms',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'A11y',
        totalChallenges: 4,
      },
    ],
    completedChallenges: 2,
    description:
      'HTML stands for HyperText Markup Language. It is used on the frontend and gives the structure to the webpage which you can style using CSS and make interactive using JavaScript.',
    points: 100,
    title: 'HTML',
    totalChallenges: 4,
  },
  {
    childSkills: [
      {
        completedChallenges: 4,
        points: 20,
        title: 'Foundation of JS',
        totalChallenges: 4,
      },
      {
        completedChallenges: 2,
        points: 20,
        title: 'Dom in Javascript',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'Fetch',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'Storage',
        totalChallenges: 4,
      },
    ],
    completedChallenges: 4,
    description:
      'Programming language and core technology of the World Wide Web, alongside HTML and CSS. In 2023, 98.7% of web use JavaScript on the client side for webpage behavior, also as third-party libraries.',
    points: 20,
    title: 'Javascript',
    totalChallenges: 4,
  },
  {
    childSkills: [
      {
        completedChallenges: 4,
        points: 20,
        title: 'Basic',
        totalChallenges: 4,
      },
      {
        completedChallenges: 2,
        points: 20,
        title: 'Layout',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'Flex',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'Grid',
        totalChallenges: 4,
      },
    ],
    completedChallenges: 2,
    description:
      'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML.',
    points: 100,
    title: 'CSS',
    totalChallenges: 4,
  },
];
export const intermediateSkills = [
  {
    childSkills: [
      {
        completedChallenges: 4,
        points: 20,
        title: 'Npm',
        totalChallenges: 4,
      },
      {
        completedChallenges: 2,
        points: 20,
        title: 'Yarn',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'Pnpm',
        totalChallenges: 4,
      },
    ],
    completedChallenges: 2,
    description:
      "Is a collection of software tools that automates the process of installing, upgrading, configuring, and removing software packages for a computer's operating system in a consistent manner.",
    points: 100,
    title: 'Package managers',
    totalChallenges: 4,
  },
  {
    childSkills: [
      {
        completedChallenges: 4,
        points: 20,
        title: 'Preprocessors',
        totalChallenges: 4,
      },
      {
        completedChallenges: 2,
        points: 20,
        title: 'Architectures',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'Modern CSS',
        totalChallenges: 4,
      },
      {
        completedChallenges: 0,
        points: 20,
        title: 'CSS Frameworks',
        totalChallenges: 4,
      },
    ],
    completedChallenges: 4,
    description:
      'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML.',
    points: 20,
    title: 'CSS',
    totalChallenges: 4,
  },
];
