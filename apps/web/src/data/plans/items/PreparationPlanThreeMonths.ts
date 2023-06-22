import { RiStarFill, RiStarLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import { QuestionCount } from '~/components/questions/listings/stats/QuestionCount';
import { themeGradient3 } from '~/components/ui/theme';

import type { PreparationPlan } from '../PreparationPlans';

export function getPreparationPlanThreeMonths(
  intl: IntlShape,
): PreparationPlan {
  return {
    description: intl.formatMessage(
      {
        defaultMessage:
          'With over {numberOfQuestions} questions, this is the most complete all-in-one front end interview preparation you can ever dream of.',
        description: 'Long description for three months study plan',
        id: 'JrmA6j',
      },
      {
        numberOfQuestions: QuestionCount,
      },
    ),
    href: '/prepare/three-months',
    longName: intl.formatMessage({
      defaultMessage: '3 Months Plan',
      description: 'Short label for 3 months study plan',
      id: 'g65B9h',
    }),
    name: intl.formatMessage({
      defaultMessage: '3 Months',
      description: 'Short label for 3 months study plan',
      id: 'ojtNa2',
    }),
    questions: {
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
        'get-elements-by-class-name',
        'get-elements-by-tag-name',
        'identical-dom-trees',
        'jquery-class-manipulation',
        'jquery-css',
        'json-stringify',
        'list-format',
        'promise-all',
        'promise-all-settled',
        'promise-any',
        'squash-object',
        'sum',
        'table-of-contents',
        'text-search',
        'text-search-ii',
        'throttle',
        'unique-array',
      ],
      // Use question importance for now.
      quiz: [],
      'system-design': [
        'news-feed-facebook',
        'autocomplete',
        'e-commerce-amazon',
        'image-carousel',
        'photo-sharing-instagram',
        'poll-widget',
      ],
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
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Everything you need to study and practice for front end interviews for a complete preparation.',
        description: 'Description of 3 Months Preparation Plan page',
        id: '8UEoLG',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Study plan to prepare for front end interviews in 3 months',
        description: 'Title of 3 Months Preparation Plan page',
        id: '7Iapcq',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Most complete all-in-one front end interview preparation.',
      description: 'Short description for 3 months study plan',
      id: '1PHE0Y',
    }),
    type: 'three-months',
  };
}

export function getPreparationPlanThemeThreeMonths(): QuestionListTheme {
  return {
    backgroundClass: themeGradient3.className,
    iconBorderClass: 'border-indigo-600',
    iconClass: 'text-indigo-600',
    iconOutline: RiStarLine,
    iconSolid: RiStarFill,
  };
}
