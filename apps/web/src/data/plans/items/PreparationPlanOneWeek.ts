import { RiFlashlightFill, RiFlashlightLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme_DEPRECATED } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import {
  PreparationPlanQuizImportanceHighCSSHTML,
  PreparationPlanQuizImportanceHighJavaScript,
} from './PreparationPlanQuizQuestions';
import type { PreparationPlan } from '../PreparationPlans';

export function getPreparationPlanOneWeek(intl: IntlShape): PreparationPlan {
  return {
    description: intl.formatMessage({
      defaultMessage: 'Prepare for your front end interviews in 1 week',
      description: 'Description for one week study plan',
      id: '/pkoGQ',
    }),
    href: '/prepare/one-week',
    longName: intl.formatMessage({
      defaultMessage: '1 Week Study Plan',
      description: 'Long label for one week study plan',
      id: '5awWqG',
    }),
    name: intl.formatMessage({
      defaultMessage: '1 Week',
      description: 'Short label for one week study plan',
      id: 'vfVwh2',
    }),
    questions: {
      algo: [],
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
          'Prepare well for your front end interviews in one week with a hyper-optimized list of practice questions. Solutions and tests by ex-interviewers from big tech.',
        description: 'Description of 1 Week Preparation Plan page',
        id: 'Gtlwzt',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: '1 Week Study Plan | GreatFrontEnd',
        description: 'Social title of 1 Week Preparation Plan page',
        id: 'lSt1q5',
      }),
      title: intl.formatMessage({
        defaultMessage: 'One Week Study Plan for Front End Interviews',
        description: 'Title of 1 Week Preparation Plan page',
        id: 'MLzMFp',
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

export function getPreparationPlanThemeOneWeek(): QuestionListTheme_DEPRECATED {
  return {
    gradient,
    iconOutline: RiFlashlightLine,
    iconSolid: RiFlashlightFill,
  };
}
