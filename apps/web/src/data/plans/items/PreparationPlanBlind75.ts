import { RiEye2Fill, RiEye2Line } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme_DEPRECATED } from '~/components/interviews/questions/common/QuestionsTypes';
import { type ThemeGradient } from '~/components/ui/theme';

import { PreparationPlanQuizImportanceHighJavaScript } from './PreparationPlanQuizQuestions';
import type { PreparationPlan } from '../PreparationPlans';

export function getPreparationPlanBlind75(intl: IntlShape): PreparationPlan {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Most important 75 questions for data structure and algorithm style interviews.',
      description: 'Long description for Blind75 plan',
      id: 'AMHPad',
    }),
    href: '/interviews/blind75',
    longName: intl.formatMessage({
      defaultMessage: 'Blind 75',
      description: 'Long label for Blind75 study plan',
      id: 'ZV1bn5',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Blind 75',
      description: 'Short label for Blind75 study plan',
      id: 'fR8Vkh',
    }),
    questions: {
      algo: [],
      javascript: [
        'array-filter',
        'array-map',
        'array-reduce',
        'camel-case-keys',
        'classnames',
        'curry',
        'curry-ii',
        'data-selection',
        'debounce',
        'deep-clone',
        'deep-equal',
        'flatten',
        'function-bind',
        'get',
      ],
      quiz: [...PreparationPlanQuizImportanceHighJavaScript],
      'system-design': [],
      'user-interface': [
        'contact-form',
        'counter',
        'digital-clock',
        'holy-grail',
        'progress-bar',
        'signup-form',
        'star-rating',
        'temperature-converter',
        'star-rating',
        'todo-list',
        'tweet',
      ],
    },
    schedule: {
      frequency: 'weekly',
      hours: 3,
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'The 75 most important questions to master for data structures and algorithms interviews, with solutions in JavaScript / TypeScript for front end engineers',
        description: 'Description of Blind75 page',
        id: 'vp+axD',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'Blind75 | GreatFrontEnd',
        description: 'OG title of Blind75 page',
        id: 'MObOIi',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Blind75 - Top 75 Data Structures and Algorithms Questions',
        description: 'Title of Blind75 page',
        id: 'rQneUp',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Most important 75 questions for data structure and algorithm style interviews',
      description: 'Short description for Blind75 plan',
      id: 'ngnwcj',
    }),
    type: 'blind75',
  };
}

const gradient: ThemeGradient<'#B7B1FF', '#4B468B'> = {
  className: 'bg-[linear-gradient(133.77deg,_#B7B1FF_0%,_#4B468B_97.95%)]',
  endColor: '#4B468B',
  startColor: '#B7B1FF',
};

export function getPreparationPlanThemeBlind75(): QuestionListTheme_DEPRECATED {
  return {
    gradient,
    iconOutline: RiEye2Line,
    iconSolid: RiEye2Fill,
  };
}
