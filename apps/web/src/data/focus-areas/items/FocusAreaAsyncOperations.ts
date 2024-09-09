import { RiRefreshLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaAsyncOperations(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Targeted practice on Async Operations interview questions',
      description: 'Description for interview preparation focus area',
      id: 'Xs7UBt',
    }),
    href: '/focus-areas/async-operations',
    longName: intl.formatMessage({
      defaultMessage: 'Async Operations',
      description: 'Name of focus area questions',
      id: 'LGm3GF',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Async Operations',
      description: 'Name of focus area questions',
      id: 'LGm3GF',
    }),
    questions: {
      algo: [],
      javascript: [
        'birth-year-histogram',
        'cancellable-interval',
        'cancellable-timeout',
        'debounce',
        'debounce-ii',
        'map-async',
        'map-async-limit',
        'promise-all',
        'promise-all-settled',
        'promise-any',
        'promise-merge',
        'promise-race',
        'promise-reject',
        'promise-resolve',
        'promise-timeout',
        'promise-with-resolvers',
        'promisify',
        'promisify-ii',
        'resumable-timeout',
        'sleep',
        'throttle',
      ],
      quiz: [],
      'system-design': [],
      'user-interface': [
        'analog-clock',
        'digital-clock',
        'grid-lights',
        'progress-bars',
        'progress-bars-ii',
        'progress-bars-iii',
        'progress-bars-iv',
        'job-board',
        'like-button',
        'stopwatch',
        'traffic-light',
        'whack-a-mole',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice async operations interview questions on async / await, Promises, and callbacks. Code in-browser with quality solutions and tests from ex-interviewers.',
        description: 'Description for interview preparation focus area',
        id: 'vccqVg',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'Async Operations Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: 'Adsxn4',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Practice Async Operations Interview Questions with Solutions',
        description: 'Title for interview preparation focus area',
        id: 'nQoQzP',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Sharpen your skills in asynchronous programming by practicing the use of async/await, Promises, and callback functions.',
      description: 'Description for interview preparation focus area',
      id: 'UrnJdy',
    }),
    type: 'async-operations',
  };
}

const gradient: ThemeGradient<'#8E2DE2', '#4A00E0'> = {
  className: 'bg-[linear-gradient(133.77deg,_#8E2DE2_0%,_#4A00E0_97.95%)]',
  endColor: '#4A00E0',
  startColor: '#8E2DE2',
};

export function getFocusAreaThemeAsyncOperations(): QuestionListTheme {
  return {
    gradient,
    iconOutline: RiRefreshLine,
    iconSolid: RiRefreshLine,
  };
}
