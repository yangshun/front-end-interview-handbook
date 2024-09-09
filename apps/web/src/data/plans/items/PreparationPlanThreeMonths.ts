import { RiStarFill, RiStarLine } from 'react-icons/ri';
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

export function getPreparationPlanThreeMonths(
  intl: IntlShape,
): PreparationPlan {
  return {
    description: intl.formatMessage(
      {
        defaultMessage: 'Prepare for your front end interviews in 3 months',
        description: 'Long description for three months study plan',
        id: 'jvoxVL',
      },
      {
        numberOfQuestions: 140,
      },
    ),
    href: '/prepare/three-months',
    longName: intl.formatMessage({
      defaultMessage: '3 Months Study Plan',
      description: 'Short label for 3 months study plan',
      id: 'G+xlW/',
    }),
    name: intl.formatMessage({
      defaultMessage: '3 Months',
      description: 'Short label for 3 months study plan',
      id: 'ojtNa2',
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
    schedule: {
      frequency: 'weekly',
      hours: 3,
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Prepare well for your front end interviews in three months with the complete all-in-one prep—over 140 questions and quality solutions from ex-interviewers at big tech',
        description: 'Description of 3 Months Preparation Plan page',
        id: 'aUDq4G',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: '3 Months Study Plan | GreatFrontEnd',
        description: 'Title of 3 Months Preparation Plan page',
        id: 'oOrYqo',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Three Months Study Plan for Front End Interviews',
        description: 'Social title of 3 Months Preparation Plan page',
        id: 'MN8mVk',
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

const gradient: ThemeGradient<'#7F00FF', '#E100FF'> = {
  className: 'bg-[linear-gradient(133.77deg,_#7F00FF_0%,_#E100FF_97.95%)]',
  endColor: '#E100FF',
  startColor: '#7F00FF',
};

export function getPreparationPlanThemeThreeMonths(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiStarLine,
    iconSolid: RiStarFill,
  };
}
