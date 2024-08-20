import {
  RiCodeSSlashLine,
  RiDashboardLine,
  RiFileList3Line,
  RiFlowChart,
  RiJavascriptLine,
  RiPlayLine,
  RiQuestionnaireLine,
  RiSurveyLine,
  RiTerminalWindowLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';
import { useIntl } from 'react-intl';

import type { GuideNavigation, GuideNavigationLink } from './types';

export const basePath = '/front-end-interview-guidebook';

function useCodingSectionItem() {
  const intl = useIntl();

  const codingSectionItem: GuideNavigationLink = {
    cardTitle: intl.formatMessage({
      defaultMessage: 'Intro to Coding Round',
      description: 'Introduction to front end coding interview',
      id: 'DDJTQX',
    }),
    description: intl.formatMessage({
      defaultMessage: 'What to expect in the coding round and tips to succeed',
      description: 'What to expect in front end coding interviews',
      id: 'Z5P0Gp',
    }),
    href: `${basePath}/coding`,
    icon: RiCodeSSlashLine,
    slug: 'coding',
    title: intl.formatMessage({
      defaultMessage: 'Coding Questions',
      description: 'Coding interview questions',
      id: 'qcjD4a',
    }),
  };

  return codingSectionItem;
}

export function useQuizSectionItem() {
  const intl = useIntl();
  const quizSectionItem: GuideNavigationLink = {
    cardTitle: intl.formatMessage({
      defaultMessage: 'Intro to Quiz Questions',
      description: 'Introduction to front end quiz questions',
      id: '8KFYWs',
    }),
    description: intl.formatMessage({
      defaultMessage:
        'What to expect, which rounds to expect them, and how to prepare',
      description: 'What to expect in front end quiz interviews',
      id: 'XdezZk',
    }),
    href: `${basePath}/quiz`,
    icon: RiQuestionnaireLine,
    slug: 'quiz',
    title: intl.formatMessage({
      defaultMessage: 'Quiz Questions',
      description: 'Front end quiz interview questions',
      id: 'Ji3Y+i',
    }),
  };

  return quizSectionItem;
}

function useCodingSectionFormatItems() {
  const intl = useIntl();
  const codingSectionFormatItems: ReadonlyArray<GuideNavigationLink> = [
    {
      description: intl.formatMessage({
        defaultMessage: 'Algo concepts to cover and tips to succeed',
        description: 'Algorithm concepts needed in front end coding interviews',
        id: '0BbsyI',
      }),
      href: `${basePath}/algorithms`,
      icon: TbBinaryTree,
      slug: 'algorithms',
      title: intl.formatMessage({
        defaultMessage: 'Algorithm Questions',
        description: 'Algorithm Coding Interview Questions',
        id: 'f89otf',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Types of JS questions, concepts to cover and rubrics',
        description:
          'JavaScript questions, concepts and rubrics during front end interviews',
        id: 'iqz/fo',
      }),
      href: `${basePath}/javascript`,
      icon: RiJavascriptLine,
      slug: 'javascript',
      title: intl.formatMessage({
        defaultMessage: 'JavaScript Questions',
        description: 'Front End JavaScript questions',
        id: 'CAMERn',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Types of UI questions, concepts to cover and rubrics',
        description:
          'Front End User Interface interview questions, concepts and rubrics',
        id: 'XwbyU0',
      }),
      href: `${basePath}/user-interface`,
      icon: RiTerminalWindowLine,
      slug: 'user-interface',
      title: intl.formatMessage({
        defaultMessage: 'User Interface Questions',
        description: 'Front End User Interface interview questions',
        id: 'MdGGzJ',
      }),
    },
    {
      href: `${basePath}/user-interface-questions-cheatsheet`,
      icon: RiFileList3Line,
      slug: 'user-interface-questions-cheatsheet',
      title: intl.formatMessage({
        defaultMessage: 'UI Questions Cheatsheet',
        description:
          'Best practices for building UI during front end interviews',
        id: 'yXzFuf',
      }),
    },
    {
      href: `${basePath}/user-interface-components-api-design-principles`,
      icon: RiDashboardLine,
      slug: 'user-interface-components-api-design-principles',
      title: intl.formatMessage({
        defaultMessage: 'UI Components API Design Principles',
        description: 'User Interface components API design principles',
        id: '0nGuf2',
      }),
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
  const intl = useIntl();
  const codingSectionItem = useCodingSectionItem();
  const quizSectionItem = useQuizSectionItem();
  const codingSectionFormatItems = useCodingSectionFormatItems();

  const navigation: GuideNavigation = {
    items: [
      {
        links: [
          {
            href: `${basePath}`,
            icon: RiPlayLine,
            slug: 'introduction',
            title: intl.formatMessage({
              defaultMessage: 'Preparation Guide',
              description: 'Front End interview preparation guide',
              id: 'Gjy+Iy',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Overview',
          description: 'Front End User Interface interviews overview',
          id: '03oqt6',
        }),
      },
      {
        links: [
          {
            href: `${basePath}/resume`,
            icon: RiSurveyLine,
            slug: 'resume',
            title: intl.formatMessage({
              defaultMessage: 'Resume Preparation',
              description: 'Preparing a resume for front end interviews',
              id: '3zMEIO',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Getting the Interview',
          description: 'Getting the front end interview',
          id: '+eHFYh',
        }),
      },
      {
        links: [
          {
            ...codingSectionItem,
            items: codingSectionFormatItems,
          },
          {
            href: `${basePath}/system-design`,
            icon: RiFlowChart,
            slug: 'system-design',
            title: intl.formatMessage({
              defaultMessage: 'System Design Questions',
              description: 'Front End system design interview questions',
              id: 'eVJIGT',
            }),
          },
          quizSectionItem,
        ],
        title: intl.formatMessage({
          defaultMessage: 'Prep by Question Type',
          description: 'Preparing by front end interview question format',
          id: '9pQEOH',
        }),
      },
    ],
    title: intl.formatMessage({
      defaultMessage: 'Front End Interview Guidebook',
      description: 'Front End Interview Guidebook title',
      id: 'w0Gmne',
    }),
  };

  return navigation;
}
