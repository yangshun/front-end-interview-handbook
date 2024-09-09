import { RiFireFill, RiFireLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import {
  PreparationPlanQuizImportanceHighCSSHTML,
  PreparationPlanQuizImportanceHighJavaScript,
  PreparationPlanQuizImportanceMidHTMLCSS,
  PreparationPlanQuizImportanceMidJavaScript,
} from './PreparationPlanQuizQuestions';
import type { PreparationPlan } from '../PreparationPlans';

export function getPreparationPlanOneMonth(intl: IntlShape): PreparationPlan {
  return {
    description: intl.formatMessage({
      defaultMessage: 'Prepare for your front end interviews in 1 month',
      description: 'Description for one month study plan',
      id: 'lL2bPL',
    }),
    href: '/prepare/one-month',
    longName: intl.formatMessage({
      defaultMessage: '1 Month Study Plan',
      description: 'Long label for one month study plan',
      id: 'GeKBII',
    }),
    name: intl.formatMessage({
      defaultMessage: '1 Month',
      description: 'Short label for one month study plan',
      id: 'EJRNjL',
    }),
    questions: {
      algo: [],
      javascript: [
        'array-filter',
        'array-reduce',
        'get',
        'promise-any',
        'promise-all',
        'function-bind',
        'debounce',
        'throttle',
        'flatten',
        'curry',
        'get-elements-by-tag-name',
        'get-elements-by-class-name',
        'jquery-css',
        'jquery-class-manipulation',
        'deep-clone',
        'deep-equal',
        'classnames',
        'list-format',
        'text-search',
        'data-selection',
        'table-of-contents',
        'identical-dom-trees',
      ],
      quiz: [
        ...PreparationPlanQuizImportanceHighJavaScript,
        ...PreparationPlanQuizImportanceHighCSSHTML,
        ...PreparationPlanQuizImportanceMidJavaScript,
        ...PreparationPlanQuizImportanceMidHTMLCSS,
      ],
      'system-design': [
        'news-feed-facebook',
        'autocomplete',
        'e-commerce-amazon',
        'image-carousel',
      ],
      'user-interface': [
        'counter',
        'contact-form',
        'signup-form',
        'holy-grail',
        'temperature-converter',
        'star-rating',
        'todo-list',
      ],
    },
    schedule: {
      frequency: 'weekly',
      hours: 6,
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Prepare well for your front end interviews in one month with practice questions spanning a perfect mix of topics. Solutions and tests by ex-interviewers from big tech.',
        description: 'Description of 1 Month Preparation Plan page',
        id: 'BEEepg',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: '1 Month Study Plan | GreatFrontEnd',
        description: 'Title of 1 Month Preparation Plan page',
        id: 'kTIFRY',
      }),
      title: intl.formatMessage({
        defaultMessage: 'One Month Study Plan for Front End Interviews',
        description: 'Title of 1 Month Preparation Plan page',
        id: 'Lhn9Pe',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage: 'All rounded coverage to bring you to the next level.',
      description: 'Short description for one month study plan',
      id: 'SId1Gq',
    }),
    type: 'one-month',
  };
}

const gradient: ThemeGradient<'#bc4e9c', '#f80759'> = {
  className: 'bg-[linear-gradient(133.77deg,_#bc4e9c_0%,_#f80759_97.95%)]',
  endColor: '#f80759',
  startColor: '#bc4e9c',
};

export function getPreparationPlanThemeOneMonth(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiFireLine,
    iconSolid: RiFireFill,
  };
}
