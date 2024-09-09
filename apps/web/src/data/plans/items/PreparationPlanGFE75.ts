import { RiStarFill, RiStarLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import { type ThemeGradient } from '~/components/ui/theme';

import { PreparationPlanQuizImportanceHighJavaScript } from './PreparationPlanQuizQuestions';
import PreparationGFE75Logo from '../logo/PreparationGFE75Logo';
import type { PreparationPlan } from '../PreparationPlans';

export function getPreparationPlanGFE75(intl: IntlShape): PreparationPlan {
  return {
    description: intl.formatMessage({
      defaultMessage: 'Most important 75 questions for front end interviews.',
      description: 'Long description for GFE75 plan',
      id: 'i0GIaV',
    }),
    href: '/interviews/greatfrontend75',
    longName: intl.formatMessage({
      defaultMessage: 'GreatFrontend 75',
      description: 'Long label for GFE75 study plan',
      id: 'c3ZWbk',
    }),
    name: intl.formatMessage({
      defaultMessage: 'GFE 75',
      description: 'Short label for GFE75 study plan',
      id: 'XFNi6J',
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
          'The 75 critical questions to master for Front End interviews, covering all essential topics. Code in-browser with solutions and tests from ex-interviewers.',
        description: 'Description of GFE75 page',
        id: 'wXON/G',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'GFE75 | GreatFrontEnd',
        description: 'OG title of GFE75 page',
        id: 'QJUTsK',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'GFE 75 - 75 Most Important Front End Interview Questions',
        description: 'Title of GFE75 page',
        id: 'PahqMO',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage: 'Most important 75 questions for front end interviews.',
      description: 'Short description for GFE75 plan',
      id: '2Bggln',
    }),
    type: 'greatfrontend75',
  };
}

const gradient: ThemeGradient<'#B7B1FF', '#4B468B'> = {
  className: 'bg-[linear-gradient(133.77deg,_#B7B1FF_0%,_#4B468B_97.95%)]',
  endColor: '#4B468B',
  startColor: '#B7B1FF',
};

export function getPreparationPlanThemeGFE75(): QuestionListTheme {
  return {
    customIcon: PreparationGFE75Logo,
    gradient,
    iconOutline: RiStarLine,
    iconSolid: RiStarFill,
  };
}
