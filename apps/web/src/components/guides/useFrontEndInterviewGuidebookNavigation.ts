import type {
  GuideNavigation,
  GuideNavigationLink,
} from './GuidesLayoutSidebar';

export const basePath = '/front-end-interview-guidebook';

function useCodingSectionItem() {
  const codingSectionItem: GuideNavigationLink = {
    cardTitle: 'Intro to Coding Round',
    description: 'What to expect in the coding round and tips to succeed',
    href: `${basePath}/coding`,
    slug: 'coding',
    title: 'Coding Questions',
  };

  return codingSectionItem;
}

export function useQuizSectionItem() {
  const quizSectionItem: GuideNavigationLink = {
    cardTitle: 'Intro to Quiz Questions',
    description:
      'What to expect, which rounds to expect them, and how to prepare',
    href: `${basePath}/quiz`,
    slug: 'quiz',
    title: 'Quiz Questions',
  };

  return quizSectionItem;
}

function useCodingSectionFormatItems() {
  const codingSectionFormatItems: ReadonlyArray<GuideNavigationLink> = [
    {
      description: 'Algo concepts to cover and tips to succeed',
      href: `${basePath}/algorithms`,
      slug: 'algorithms',
      title: 'Algorithm Questions',
    },
    {
      description: 'Types of JS questions, concepts to cover and rubrics',
      href: `${basePath}/javascript`,
      slug: 'javascript',
      title: 'JavaScript Questions',
    },
    {
      description: 'Types of UI questions, concepts to cover and rubrics',
      href: `${basePath}/user-interface`,
      slug: 'user-interface',
      title: 'User Interface Questions',
    },
  ];

  return codingSectionFormatItems;
}

export function useCodingQuestionListGuideItems() {
  const codingSectionItem = useCodingSectionItem();
  const codingSectionFormatItems = useCodingSectionFormatItems();

  const combined: ReadonlyArray<GuideNavigationLink> = [
    codingSectionItem,
    ...codingSectionFormatItems,
  ];

  return combined;
}

export function useFrontEndInterviewGuidebookNavigation() {
  const codingSectionItem = useCodingSectionItem();
  const quizSectionItem = useQuizSectionItem();
  const codingSectionFormatItems = useCodingSectionFormatItems();
  const navigation: GuideNavigation = {
    items: [
      {
        links: [
          {
            href: `${basePath}`,
            slug: 'introduction',
            title: 'Preparation Guide',
          },
        ],
        title: 'Overview',
      },
      {
        links: [
          {
            href: `${basePath}/resume`,
            slug: 'resume',
            title: 'Resume Preparation',
          },
        ],
        title: 'Getting the Interview',
      },
      {
        links: [
          {
            ...codingSectionItem,
            items: codingSectionFormatItems,
          },
          {
            href: `${basePath}/system-design`,
            slug: 'system-design',
            title: 'System Design Questions',
          },
          quizSectionItem,
        ],
        title: 'Preparation by Question Type',
      },
      {
        links: [
          {
            href: `${basePath}/user-interface-best-practices`,
            slug: 'user-interface-best-practices',
            title: 'Best Practices for Building User Interfaces',
          },
          {
            href: `${basePath}/user-interface-components-api-design-principles`,
            slug: 'user-interface-components-api-design-principles',
            title: 'UI Components API Design Principles',
          },
        ],
        title: 'Additional Tips',
      },
    ],
    title: 'Front End Interview Guidebook',
  };

  return navigation;
}
