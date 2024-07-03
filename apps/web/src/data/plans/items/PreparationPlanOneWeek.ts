import { RiFlashlightFill, RiFlashlightLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import {
  PreparationPlanQuizImportanceHighCSSHTML,
  PreparationPlanQuizImportanceHighJavaScript,
} from '../PreparationPlanQuizQuestions';
import type { PreparationPlan } from '../PreparationPlans';

export function getPreparationPlanOneWeek(intl: IntlShape): PreparationPlan {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for your front end interviews in one week. Efficiently focus on the most important concepts through a good mix of coding and quiz questions.',
      description: 'Description for one week study plan',
      id: 'npvgQq',
    }),
    href: '/prepare/one-week',
    longName: intl.formatMessage({
      defaultMessage: '1 Week Plan',
      description: 'Long label for one week study plan',
      id: 'jN6xqZ',
    }),
    name: intl.formatMessage({
      defaultMessage: '1 Week',
      description: 'Short label for one week study plan',
      id: 'vfVwh2',
    }),
    questions: {
      javascript: [
        'array-filter',
        'promise-all',
        'debounce',
        'flatten',
        'curry',
        'get-elements-by-tag-name',
        'jquery-css',
        'deep-equal',
        'classnames',
        'list-format',
      ],
      quiz: [
        ...PreparationPlanQuizImportanceHighJavaScript,
        ...PreparationPlanQuizImportanceHighCSSHTML,
      ],
      'system-design': ['news-feed-facebook', 'autocomplete'],
      'user-interface': [
        'counter',
        'contact-form',
        'holy-grail',
        'star-rating',
        'todo-list',
      ],
    },
    schedule: {
      frequency: 'daily',
      hours: 2,
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Study and practice the exact questions and concepts you need to prepare for front end interviews within a week',
        description: 'Description of 1 Week Preparation Plan page',
        id: 'D3YhsE',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Study plan to prepare for front end interviews in 1 week',
        description: 'Title of 1 Week Preparation Plan page',
        id: 'UiHdWK',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage: 'Efficiently focus on the most important concepts',
      description: 'Short description for one week study plan',
      id: '4WUroS',
    }),
    type: 'one-week',
  };
}

const gradient: ThemeGradient<'#f7ff00', '#db36a4'> = {
  className: 'bg-[linear-gradient(133.77deg,_#f7ff00_0%,_#db36a4_97.95%)]',
  endColor: '#db36a4',
  startColor: '#f7ff00',
};

export function getPreparationPlanThemeOneWeek(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiFlashlightLine,
    iconSolid: RiFlashlightFill,
  };
}
