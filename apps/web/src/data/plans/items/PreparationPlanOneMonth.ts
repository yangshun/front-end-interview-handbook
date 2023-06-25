import { RiFireFill, RiFireLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import { themeGradientBlueGreen } from '~/components/ui/theme';

import type { PreparationPlan } from '../PreparationPlans';

export function getPreparationPlanOneMonth(intl: IntlShape): PreparationPlan {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for your front end interviews in one month. All rounded coverage that is sure to bring your front end interview skills to the next level.',
      description: 'Description for one month study plan',
      id: 'CyhMLj',
    }),
    href: '/prepare/one-month',
    longName: intl.formatMessage({
      defaultMessage: '1 Month Plan',
      description: 'Long label for one month study plan',
      id: 'lyjVwD',
    }),
    name: intl.formatMessage({
      defaultMessage: '1 Month',
      description: 'Short label for one month study plan',
      id: 'EJRNjL',
    }),
    questions: {
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
      // Use question importance for now.
      quiz: [],
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
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Structured study plan developed by ex-interviewers at FAANG. Prepare holistically for front end interviews within a month',
        description: 'Description of 1 Month Preparation Plan page',
        id: 'N4F6al',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Study plan to prepare for front end interviews in 1 month',
        description: 'Title of 1 Month Preparation Plan page',
        id: 'O7MAvX',
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

export function getPreparationPlanThemeOneMonth(): QuestionListTheme {
  return {
    iconBorderClass: 'border-violet-600',
    iconClass: 'text-violet-600',
    iconOutline: RiFireLine,
    iconSolid: RiFireFill,
    theme: themeGradientBlueGreen,
  };
}
