import { RiRefreshLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaAsyncOperations(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Sharpen your skills in asynchronous programming by practicing the use of async/await, Promises, and callback functions. Dive into scenarios that require asynchronous operations, such as making API requests and delayed code execution.',
      description: 'Description for interview preparation focus area',
      id: 'c5f6aC',
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
      javascript: [
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
          'Sharpen your skills in asynchronous programming by practicing the use of async/await, Promises, and callback functions.',
        description: 'Description for interview preparation focus area',
        id: 'UrnJdy',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Master async programming for front end interviews',
        description: 'Title for interview preparation focus area',
        id: 'EmirPr',
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
