import {
  RiCodeSSlashLine,
  RiDashboardLine,
  RiFileList3Line,
  RiJavascriptFill,
  RiTerminalWindowLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import { useIntl } from '~/components/intl';

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
      defaultMessage: 'Overview',
      description: 'Coding interview questions',
      id: 'GHbtp8',
    }),
    type: 'link',
  };

  return codingSectionItem;
}

export function useQuizSectionItem() {
  const intl = useIntl();
  const quizSectionItem: GuideNavigationLink = {
    cardTitle: intl.formatMessage({
      defaultMessage: 'Intro to quiz questions',
      description: 'Introduction to front end quiz questions',
      id: 'Eru4eL',
    }),
    description: intl.formatMessage({
      defaultMessage:
        'What to expect, which rounds to expect them, and how to prepare',
      description: 'What to expect in front end quiz interviews',
      id: 'XdezZk',
    }),
    href: `${basePath}/quiz`,
    slug: 'quiz',
    title: intl.formatMessage({
      defaultMessage: 'Quiz interviews',
      description: 'Front end quiz interview questions',
      id: 'P3l/Ce',
    }),
    type: 'link',
  };

  return quizSectionItem;
}

function useCodingSectionFormatItems() {
  const intl = useIntl();
  const codingSectionItems = {
    algo: {
      description: intl.formatMessage({
        defaultMessage: 'Algo concepts to cover and tips to succeed',
        description: 'Algorithm concepts needed in front end coding interviews',
        id: '0BbsyI',
      }),
      href: `${basePath}/algorithms`,
      icon: TbBinaryTree,
      slug: 'algorithms',
      title: intl.formatMessage({
        defaultMessage: 'Algorithms',
        description: 'Algorithm Coding Interview Questions',
        id: 'R4OrtB',
      }),
      type: 'link',
    },
    javascript: {
      description: intl.formatMessage({
        defaultMessage: 'Types of JS questions, concepts to cover and rubrics',
        description:
          'JavaScript questions, concepts and rubrics during front end interviews',
        id: 'iqz/fo',
      }),
      href: `${basePath}/javascript`,
      icon: RiJavascriptFill,
      slug: 'javascript',
      title: intl.formatMessage({
        defaultMessage: 'JavaScript coding',
        description: 'Front End JavaScript questions',
        id: 'Y3gxjL',
      }),
      type: 'link',
    },
    userInterface: {
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
        defaultMessage: 'Overview',
        description: 'Front End User Interface interview questions',
        id: 'AeHj3S',
      }),
      type: 'link',
    },
    userInterfaceAPI: {
      href: `${basePath}/user-interface-components-api-design-principles`,
      icon: RiDashboardLine,
      slug: 'user-interface-components-api-design-principles',
      title: intl.formatMessage({
        defaultMessage: 'API design principles',
        description: 'User Interface components API design principles',
        id: 'jmGaKF',
      }),
      type: 'link',
    },
    userInterfaceCheatsheet: {
      href: `${basePath}/user-interface-questions-cheatsheet`,
      icon: RiFileList3Line,
      slug: 'user-interface-questions-cheatsheet',
      title: intl.formatMessage({
        defaultMessage: 'Cheatsheet',
        description:
          'Best practices for building UI during front end interviews',
        id: 'l6uDOh',
      }),
      type: 'link',
    },
  } as const;

  return codingSectionItems;
}

export function useCodingQuestionListGuideItems() {
  const codingSectionItem = useCodingSectionItem();
  const codingSectionFormatItems = useCodingSectionFormatItems();
  const combined: ReadonlyArray<GuideNavigationLink> = [
    codingSectionItem,
    codingSectionFormatItems.javascript,
    codingSectionFormatItems.algo,
    codingSectionFormatItems.userInterface,
    codingSectionFormatItems.userInterfaceCheatsheet,
    codingSectionFormatItems.userInterfaceAPI,
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
        href: basePath,
        slug: 'introduction',
        title: intl.formatMessage({
          defaultMessage: 'Introduction',
          description: 'Front End interview preparation guide',
          id: '99Ewym',
        }),
        type: 'link',
      },
      {
        links: [
          codingSectionItem,
          codingSectionFormatItems.javascript,
          codingSectionFormatItems.algo,
        ],
        title: intl.formatMessage({
          defaultMessage: 'Coding interviews',
          description: 'Preparing by front end interview question format',
          id: 'O6pifk',
        }),
        type: 'list',
      },
      {
        links: [
          codingSectionFormatItems.userInterface,
          codingSectionFormatItems.userInterfaceCheatsheet,
          codingSectionFormatItems.userInterfaceAPI,
        ],
        title: intl.formatMessage({
          defaultMessage: 'User interface interviews',
          description: 'Preparing by front end interview question format',
          id: '73za88',
        }),
        type: 'list',
      },
      {
        href: `${basePath}/system-design`,
        slug: 'system-design',
        title: intl.formatMessage({
          defaultMessage: 'System design interviews',
          description: 'Front End system design interview questions',
          id: 'YrEBRj',
        }),
        type: 'link',
      },
      quizSectionItem,
      {
        href: `${basePath}/resume`,
        slug: 'resume',
        title: intl.formatMessage({
          defaultMessage: 'Resume preparation',
          description: 'Preparing a resume for front end interviews',
          id: 'kPBwBR',
        }),
        type: 'link',
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
