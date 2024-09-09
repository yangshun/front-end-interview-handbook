import { RiFlowChart } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaStateManagement(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Targeted practice on State Management interview questions',
      description: 'Description for interview preparation focus area',
      id: 'yztOsj',
    }),
    href: '/focus-areas/state-management',
    longName: intl.formatMessage({
      defaultMessage: 'State Management',
      description: 'Name of focus area questions',
      id: '7xPEg+',
    }),
    name: intl.formatMessage({
      defaultMessage: 'State Management',
      description: 'Name of focus area questions',
      id: '7xPEg+',
    }),
    questions: {
      algo: [],
      javascript: [],
      quiz: [],
      'system-design': [],
      'user-interface': [
        'connect-four',
        'data-table',
        'data-table-ii',
        'data-table-iii',
        'data-table-iv',
        'grid-lights',
        'image-carousel-ii',
        'image-carousel-iii',
        'memory-game',
        'nested-checkboxes',
        'pixel-art',
        'transfer-list',
        'transfer-list-ii',
        'undoable-counter',
        'users-database',
        'whack-a-mole',
        'wordle',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice State Management interview questions that train your skills in complex state design and state manipulation. Code in-browser with solutions from ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: '4GPc8y',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'State Management Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: '9Ct+/8',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Practice State Management Interview Questions with Solutions',
        description: 'Title for interview preparation focus area',
        id: 'hLuz6h',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Train your skills in designing complex state and implementing operations to manipulate state.',
      description: 'Description for interview preparation focus area',
      id: 's8/47i',
    }),
    type: 'state-management',
  };
}

const gradient: ThemeGradient<'#4e54c8', '#8f94fb'> = {
  className: 'bg-[linear-gradient(133.77deg,_#4e54c8_0%,_#8f94fb_97.95%)]',
  endColor: '#8f94fb',
  startColor: '#4e54c8',
};

export function getFocusAreaThemeStateManagement(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiFlowChart,
    iconSolid: RiFlowChart,
  };
}
